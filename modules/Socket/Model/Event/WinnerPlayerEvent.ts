import {EventInterface} from "./EventInterface";
import {EventsReference} from "../EventsReference";
import {Game} from "../../../Game/Model/Game";

export class WinnerPlayerEvent implements EventInterface{
    private game: Game;

    constructor(game: Game){
        this.game = game;

    }
    geEventName() {
        return EventsReference.WINNER_PLAYER
    }

    getEventPayload() {
        return {
            game: this.game.id,
            winner: this.game.playerDone(),
            winsPlayerA: this.game.getWinsPlayerA(),
            winsPlayerB: this.game.getWinsPlayerB(),
            totalTurns: this.game.getTotalTurns()
        }
    }

}