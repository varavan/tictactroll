import {ChatMessage} from "../Model/ChatMessage";
import {SocketService} from "../../Socket/Service/SocketService";
import {UpdateChatEvent} from "../../Socket/Model/Event/UpdateChatEvent";

export class ChatManager{
    private socketService: SocketService;

    constructor(socketService: SocketService){
        this.socketService = socketService;

    }

    public broadcastMessage(message: ChatMessage){

        let event : UpdateChatEvent = new UpdateChatEvent(message);

        if(message.getGame().getPlayerA() != undefined){
            this.socketService.emit(event, message.getGame().getPlayerA());
        }

        if(message.getGame().getPlayerB() != undefined){
            this.socketService.emit(event, message.getGame().getPlayerB());
        }
    }
}