import {EventInterface} from "./EventInterface";
import {EventsReference} from "../EventsReference";
import {Game} from "../../../Game/Model/Game";

export class GameIsDoneEvent implements EventInterface{
    private game: Game;

    constructor(game: Game){
        this.game = game;

    }
    geEventName() {
        return EventsReference.GAME_IS_DONE
    }

    getEventPayload() {
        return {
            game: this.game.id
        }
    }

}