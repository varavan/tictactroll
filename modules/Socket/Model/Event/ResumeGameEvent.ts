import {EventInterface} from "./EventInterface";
import {EventsReference} from "../EventsReference";
import {Game} from "../../../Game/Model/Game";

export class ResumeGameEvent implements EventInterface{
    private game: Game;

    constructor(game: Game){
        this.game = game;

    }
    geEventName() {
        return EventsReference.RESUME_GAME;
    }

    getEventPayload() {
        return {
            game: this.game.id
        }
    }

}