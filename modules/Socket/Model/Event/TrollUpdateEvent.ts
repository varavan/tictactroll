import {EventInterface} from "./EventInterface";
import {EventsReference} from "../EventsReference";
import {TrollInterface} from "../../../Game/Component/TrollInterface";

export class TrollUpdateEvent implements EventInterface{
    private troll: TrollInterface;


    constructor(troll: TrollInterface){
        this.troll = troll;

    }

    geEventName() {
        return EventsReference.TROLL_UPDATE;
    }

    getEventPayload() {
        return {
            message: this.troll.getMessage()
        }
    }

}