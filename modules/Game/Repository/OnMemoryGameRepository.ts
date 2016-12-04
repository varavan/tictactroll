
import {GameRepositoryInterface} from "./GameRepositoryInterface";
import {Game} from "../Model/Game";
import {GameMustBeInitializedToUpdateException} from "../Exception/GameMustBeInitializedToUpdateException";
import {GameNotFoundException} from "../Exception/GameNotFoundException";

export class OnMemoryGameRepository implements GameRepositoryInterface {
    findAll(): Array<Game> {
        return this.games;
    }

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
}