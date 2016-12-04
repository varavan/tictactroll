import {Game} from "../Model/Game";

export interface GameRepositoryInterface {

    create(game: Game): Game;

    update(game: Game): Game;

    find(gameId): Game;

    findAll(): Game[];
}