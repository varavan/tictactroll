import {PlayerEnum} from "./PlayerEnum";
import {Game} from "./Game";
export class ChatMessage{

    private message: string;
    private player: PlayerEnum;
    private game: Game;
    private createdAt: Date;

    constructor(message:string, player: PlayerEnum, game: Game){
        this.message = message;
        this.player = player;
        this.game = game;
        this.createdAt = new Date();

    }

    getMessage(): string {
        return this.message;
    }

    getPlayer(): PlayerEnum {
        return this.player;
    }

    getGame(): Game {
        return this.game;
    }

    getCreatedAt(): Date{
        return this.createdAt;
    }
}