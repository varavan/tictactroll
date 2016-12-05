
import {GameRepositoryInterface} from "./GameRepositoryInterface";
import {Game} from "../Model/Game";
import {GameMustBeInitializedToUpdateException} from "../Exception/GameMustBeInitializedToUpdateException";
import {GameNotFoundException} from "../Exception/GameNotFoundException";
import * as _ from 'underscore';
import {GameStatusEnum} from "../Model/GameStatusEnum";
import {User} from "../../User/Model/User";
import {PlayerEnum} from "../Model/PlayerEnum";

export class OnMemoryGameRepository implements GameRepositoryInterface {

    private games: any;

    constructor(){
        this.games = {};
    }

    public create(game: Game): Game {

        game.id = Math.random().toString(36).substr(2, 10);

        this.games[game.id] = game;

        return game;
    }

    public update(game: Game): Game {

        if(game.id == undefined){
            throw new GameMustBeInitializedToUpdateException;
        }

        this.games[game.id] = game;

        return undefined;
    }

    public find(gameId): Game
    {

        let game: Game = this.games[gameId];

        if(game == undefined){
            throw new GameNotFoundException(gameId);
        }

        return game;
    }

    findByStatus(status: GameStatusEnum): Game[] {

        return _.filter(this.games, function(game: Game){
            return game.getStatus() == status;
        })
    }

    findAll(): Array<Game> {
        return this.games;
    }

    findByPlayerAndStatus(user:User, status: GameStatusEnum): Game[] {
        return _.filter(this.games, function(game: Game){
            return (game.getStatus() == status  && game.findPlayerByPlayerId(user.getId()) != PlayerEnum.noPlayer);
        })
    }

}