import {TrollInterface} from "./TrollInterface";
import {TrollTypeEnum} from "../Model/TrollTypeEnum";
import {Board} from "../Model/Board";
import {BoardPositionEnum} from "../Model/BoardPositionEnum";
import {PlayerEnum} from "../Model/PlayerEnum";

export class SkipLastMovementTroll implements TrollInterface {

    getType(): TrollTypeEnum {
        return TrollTypeEnum.TURN;
    }

    processBoard(board: Board): Board {
        return board;
    }

    processCell(board: Board, position: BoardPositionEnum): Board {

        board.set(position, PlayerEnum.noPlayer);

        return board;
    }

    getMessage(): string {
        return 'Your last movmenent, never minds';
    }

}