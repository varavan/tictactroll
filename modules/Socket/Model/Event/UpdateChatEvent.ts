
import {EventInterface} from "./EventInterface";
import {EventsReference} from "../EventsReference";
import {ChatMessage} from "../../../Game/Model/ChatMessage";
export class UpdateChatEvent implements EventInterface{
    private message: ChatMessage;

    constructor(message: ChatMessage){
        this.message = message;

    }

    geEventName() {
        return EventsReference.UPDATE_CHAT;
    }

    getEventPayload() {
        return {
            message: this.message.getMessage(),
            player: this.message.getPlayer(),
            time: this.message.getCreatedAt()
        }
    }

}