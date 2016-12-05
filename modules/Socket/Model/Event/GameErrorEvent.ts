import {EventInterface} from "./EventInterface";
import {EventsReference} from "../EventsReference";
import {ExceptionInterface} from "../../../Game/Exception/ExceptionInterface";

export class GameErrorEvent implements EventInterface{
    private error: ExceptionInterface;

    constructor(error: ExceptionInterface){
        this.error = error;

    }
    geEventName() {
        return EventsReference.GAME_ERROR;
    }

    getEventPayload() {
        return {
            message: this.error.getMessage()
        }
    }

}