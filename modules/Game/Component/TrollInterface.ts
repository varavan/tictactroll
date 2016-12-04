import {Board} from "../Model/Board";
import {TrollTypeEnum} from "../Model/TrollTypeEnum";
import {BoardPositionEnum} from "../Model/BoardPositionEnum";
export interface TrollInterface{

    getType(): TrollTypeEnum;
    processBoard(board: Board): Board;
    processCell(board: Board, position: BoardPositionEnum): Board;
    getMessage(): string;

}