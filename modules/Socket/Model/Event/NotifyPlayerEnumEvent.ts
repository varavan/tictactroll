import {EventInterface} from "./EventInterface";
import {EventsReference} from "../EventsReference";
import {ExceptionInterface} from "../../../Game/Exception/ExceptionInterface";
import {Game} from "../../../Game/Model/Game";
import {User} from "../../../User/Model/User";

export class NotifyPlayerEnumEvent implements EventInterface{
    private game: Game;
    private player: User;

    constructor(game: Game, player: User){
        this.game = game;
        this.player = player;


    }
    geEventName() {
        return EventsReference.NOTIFY_PLAYER_ENUM;
    }

    getEventPayload() {
        return {
            game: this.game.id,
            player: this.game.findPlayerByPlayerId(this.player.getId())
        }
    }

}