import {User} from "../../User/Model/User";
import {Board} from "../Model/Board";
import {Game} from "../Model/Game";
import {GameRepositoryInterface} from "../Repository/GameRepositoryInterface";
import {BoardPositionEnum} from "../Model/BoardPositionEnum";
import {MoveNotAllowedException} from "../Exception/MoveNotAllowedException";
import {PlayerEnum} from "../Model/PlayerEnum";
import {SocketService} from "../../Socket/Service/SocketService";
import {UpdateBoardEvent} from "../../Socket/Model/Event/UpdateBoardEvent";
import {TrollInterface} from "../Component/TrollInterface";
import {TrollTypeEnum} from "../Model/TrollTypeEnum";
import * as _ from 'underscore';
import {TrollUpdateEvent} from "../../Socket/Model/Event/TrollUpdateEvent";
import {EventInterface} from "../../Socket/Model/Event/EventInterface";

export class GameManager {

    private gameRepository: GameRepositoryInterface;
    private socketService: SocketService;
    private trolls: Array<TrollInterface>;
    private trollNexTurn: TrollInterface;

    constructor(
        gameRepository: GameRepositoryInterface,
        socketService: SocketService
    ) {
        this.gameRepository = gameRepository;
        this.socketService = socketService;
        this.trolls = [];
        this.trollNexTurn = undefined;
    }

    public addTroll(troll: TrollInterface){
        this.trolls.push(troll);
    }

    public troll(gameId){
        let game: Game = this.gameRepository.find(gameId);
        let troll: TrollInterface = this.trolls[_.random(this.trolls.length -1)];
        if(troll.getType() == TrollTypeEnum.TURN && this.trollNexTurn == undefined){
            this.trollNexTurn = troll;
            return;
        }

        game.setBoard(troll.processBoard(game.getBoard()));

        this.updateBoardEvent(game);

        this.broadcastEvent(new TrollUpdateEvent(troll), game);
        this.gameRepository.update(game);

    }

    public create(): Game {
        let board = new Board;
        let game = new Game;

        game.setBoard(board);

        game = this.gameRepository.create(game);

        return game;

    }

    public updatePlayerForGame(gameId: any, playerType: PlayerEnum, player: User): Game {
        let game: Game = this.gameRepository.find(gameId);

        if (PlayerEnum.PlayerA == playerType) {
            game.setPlayerA(player);
        } else {
            game.setPlayerB(player);
        }

        return this.gameRepository.update(game);
    }

    public move(gameId: any, player: User, position: BoardPositionEnum) {

        let game: Game = this.gameRepository.find(gameId);

        if (game.isPositionBusy(position)) {
            throw new MoveNotAllowedException('Position busy');
        }

        if (game.isDone()) {
            throw new MoveNotAllowedException('Game is done');
        }

        game.setMove(player, position);

        if(this.trollNexTurn != undefined){
            game.setBoard(this.trollNexTurn.processCell(game.getBoard(), position));
            this.socketService.emit(new TrollUpdateEvent(this.trollNexTurn), player);
            this.trollNexTurn = undefined;
        }

        this.updateBoardEvent(game);
        this.gameRepository.update(game);

        if (game.playerDone() != PlayerEnum.noPlayer) {

            // game is done
            game.finish();

        }
    }

    private updateBoardEvent(game: Game){
        this.broadcastEvent(new UpdateBoardEvent(game.getBoard()), game);
    }

    private broadcastEvent(event: EventInterface, game: Game){
        this.socketService.emit(event, game.getPlayerA());
        this.socketService.emit(event, game.getPlayerB());
    }
}