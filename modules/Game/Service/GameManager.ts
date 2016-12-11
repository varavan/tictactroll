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
import {GameStatusEnum} from "../Model/GameStatusEnum";
import {GameIsNotPlayableException} from "../Exception/GameIsNotPlayableException";
import {NoSpotOnGameExpcetion} from "../Exception/NoSpotOnGameExpcetion";
import {PlayerDisconnectedFromGameException} from "../Exception/PlayerDisconnectedFromGameException";
import {GameErrorEvent} from "../../Socket/Model/Event/GameErrorEvent";
import {WarnNextTurnEvent} from "../../Socket/Model/Event/WarnNextTurnEvent";
import {PlayerAbandonedEvent} from "../../Socket/Model/Event/PlayerAbandonedEvent";
import {GameIsDoneEvent} from "../../Socket/Model/Event/GameIsDoneEvent";
import {WinnerPlayerEvent} from "../../Socket/Model/Event/WinnerPlayerEvent";
import {CanNotRematchException} from "../Exception/CanNotRematchException";
import {ResumeGameEvent} from "../../Socket/Model/Event/ResumeGameEvent";

export class GameManager {

    private gameRepository: GameRepositoryInterface;
    private socketService: SocketService;
    private trolls: Array<TrollInterface>;
    private trollNexTurn: any;

    constructor(gameRepository: GameRepositoryInterface,
                socketService: SocketService) {
        this.gameRepository = gameRepository;
        this.socketService = socketService;
        this.trolls = [];
        this.trollNexTurn = {};

        // stop games on disconnect user
        let self = this;
        this.socketService.addOnDisconnectUserCallback(
            function (user: User) {
                console.log('observer launched');
                let games = self.gameRepository.findByPlayerAndStatus(user, GameStatusEnum.PLAYING);

                _.each(games, function (game: Game) {

                    game.setStatus(GameStatusEnum.STOPPED);
                    self.gameRepository.update(game);

                    let error = new PlayerDisconnectedFromGameException(game, game.findPlayerByPlayerId(user.getId()));
                    let event = new GameErrorEvent(error);
                    self.broadcastEvent(event, game);

                    // player abandoned event
                    self.broadcastEvent(new PlayerAbandonedEvent(game), game);
                    self.broadcastEvent(new GameIsDoneEvent(game), game);

                    self.trollNexTurn[game.id] = undefined;
                });
            }
        );
    }

    public addTroll(troll: TrollInterface) {
        this.trolls.push(troll);
    }


    public troll(gameId) {
        let game: Game = this.gameRepository.find(gameId);
        let troll: TrollInterface = this.trolls[_.random(this.trolls.length - 1)];
        if (troll.getType() == TrollTypeEnum.TURN) {
            this.trollNexTurn[gameId] = troll;
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

    public startGame(game: Game) {
        this.updateBoardEvent(game);

        // set first turn
        game.setLastPlayerMoved(PlayerEnum.PlayerA);
        this.broadcastEvent(new WarnNextTurnEvent(game), game);

        this.gameRepository.update(game);
    }

    public updatePlayerForGame(gameId: any, playerType: PlayerEnum, player: User): Game {
        let game: Game = this.gameRepository.find(gameId);

        if (PlayerEnum.PlayerA == playerType) {
            game.setPlayerA(player);
        } else {
            game.setPlayerB(player);
        }

        if (game.getPlayerA() == undefined || game.getPlayerB() == undefined) {
            game.setStatus(GameStatusEnum.WAITING_FOR_PLAYERS);
        } else {
            game.setStatus(GameStatusEnum.READY_TO_START);
        }

        return this.gameRepository.update(game);
    }

    public findSpotForGame(gameId): PlayerEnum {
        let game: Game = this.gameRepository.find(gameId);

        let player: PlayerEnum = game.getPlayerSpotAvailable();

        if (player == PlayerEnum.noPlayer) {
            throw new NoSpotOnGameExpcetion();
        }

        return player;
    }

    public move(gameId: any, player: User, position: BoardPositionEnum) {

        let game: Game = this.gameRepository.find(gameId);

        if (game.findPlayerByPlayerId(player.getId()) == PlayerEnum.noPlayer) {
            throw new MoveNotAllowedException('You do not belong to this game');
        }

        if (game.isPositionBusy(position)) {
            throw new MoveNotAllowedException('Position busy');
        }

        if (game.isDone()) {
            throw new MoveNotAllowedException('Game is done');
        }

        if (game.getStatus() == GameStatusEnum.READY_TO_START) {
            game.setStatus(GameStatusEnum.PLAYING);
        }

        if (game.getStatus() != GameStatusEnum.PLAYING) {
            throw new GameIsNotPlayableException();
        }

        game.setMove(player, position);

        if (this.trollNexTurn[game.id] != undefined) {
            game.setBoard(this.trollNexTurn[game.id].processCell(game.getBoard(), position));
            this.socketService.emit(new TrollUpdateEvent(this.trollNexTurn[game.id]), player);
            this.trollNexTurn[game.id] = undefined;
        }


        if (game.playerDone() != PlayerEnum.noPlayer) {

            // game is done
            game.finish();

            this.broadcastEvent(new GameIsDoneEvent(game), game);
            this.broadcastEvent(new WinnerPlayerEvent(game), game);

        } else {
            this.updateBoardEvent(game);
            this.broadcastEvent(new WarnNextTurnEvent(game), game);
        }

        this.gameRepository.update(game);
    }

    public rematchGame(game: Game) {

        if(!game.isDone()){
            throw new CanNotRematchException();
        }

        game.cleanBoard();

        this.broadcastEvent(new ResumeGameEvent(game), game);
        this.updateBoardEvent(game);
        this.broadcastEvent(new WarnNextTurnEvent(game), game);

        this.gameRepository.update(game);

    }

    private updateBoardEvent(game: Game) {
        this.broadcastEvent(new UpdateBoardEvent(game.getBoard()), game);
    }

    private broadcastEvent(event: EventInterface, game: Game) {
        if (game.getPlayerA() != undefined) {
            this.socketService.emit(event, game.getPlayerA());
        }

        if (game.getPlayerB() != undefined) {
            this.socketService.emit(event, game.getPlayerB());
        }
    }
}