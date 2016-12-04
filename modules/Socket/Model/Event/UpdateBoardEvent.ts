import {EventInterface} from "./EventInterface";
import {EventsReference} from "../EventsReference";
import {Board} from "../../../Game/Model/Board";
import {BoardPositionEnum} from "../../../Game/Model/BoardPositionEnum";

export class UpdateBoardEvent implements EventInterface{

    private board: Board;

    constructor(board: Board){
        this.board = board;
    }

    geEventName() {
        return EventsReference.UPDATE_BOARD;
    }

    getEventPayload() {

        return {
            "R1C1": this.board.get(BoardPositionEnum.POSITION_R1C1),
            "R1C2": this.board.get(BoardPositionEnum.POSITION_R1C2),
            "R1C3": this.board.get(BoardPositionEnum.POSITION_R1C3),

            "R2C1": this.board.get(BoardPositionEnum.POSITION_R2C1),
            "R2C2": this.board.get(BoardPositionEnum.POSITION_R2C2),
            "R2C3": this.board.get(BoardPositionEnum.POSITION_R2C3),

            "R3C1": this.board.get(BoardPositionEnum.POSITION_R3C1),
            "R3C2": this.board.get(BoardPositionEnum.POSITION_R3C2),
            "R3C3": this.board.get(BoardPositionEnum.POSITION_R3C3)

        }
    }

}