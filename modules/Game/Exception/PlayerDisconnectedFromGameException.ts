import {ExceptionInterface} from "./ExceptionInterface";
import {PlayerEnum} from "../Model/PlayerEnum";
import {Game} from "../Model/Game";
export class PlayerDisconnectedFromGameException implements ExceptionInterface {
    private game: Game;
    private player: PlayerEnum;

    constructor(game: Game, player: PlayerEnum){
        this.game = game;
        this.player = player;

    }

    getMessage() {
        return "Player has disconnected from game";
    }

}