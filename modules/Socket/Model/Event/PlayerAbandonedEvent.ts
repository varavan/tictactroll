import {EventInterface} from "./EventInterface";
import {EventsReference} from "../EventsReference";
import {Game} from "../../../Game/Model/Game";

export class PlayerAbandonedEvent implements EventInterface{
    private game: Game;

    constructor(game: Game){
        this.game = game;

    }
    geEventName() {
        return EventsReference.PLAYER_ABANDONED
    }

    getEventPayload() {
        return {
            game: this.game.id
        }
    }

}