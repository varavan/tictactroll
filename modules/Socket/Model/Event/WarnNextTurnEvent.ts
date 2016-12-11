import {EventInterface} from "./EventInterface";
import {EventsReference} from "../EventsReference";
import {Game} from "../../../Game/Model/Game";

export class WarnNextTurnEvent implements EventInterface{
    private game: Game;

    constructor(game: Game){
        this.game = game;
    }

    geEventName() {
        return EventsReference.WARN_NEXT_TURN;
    }

    getEventPayload() {
        return {
            next_player: this.game.nextPlayerMove(),
            gameId: this.game.id
        }
    }

}