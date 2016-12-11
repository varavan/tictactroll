
import {TrollInterface} from "./TrollInterface";
import {TrollTypeEnum} from "../Model/TrollTypeEnum";
import {Board} from "../Model/Board";
import * as _ from 'underscore';
import {PlayerEnum} from "../Model/PlayerEnum";
import {BoardPositionEnum} from "../Model/BoardPositionEnum";

export class EmptyDownDiagonalTroll implements TrollInterface{
    processCell(board: Board, position: BoardPositionEnum): Board {
        return board;
    }

    getMessage(): string {
        return 'Too packed down there';
    }

    getType(): TrollTypeEnum {

        return TrollTypeEnum.LIVE;
    }

    processBoard(board: Board): Board {

        _.each(board.DIAGONAL_2, function(position){
            board.set(position, PlayerEnum.noPlayer);
        });

        board.set(BoardPositionEnum.POSITION_R2C3, PlayerEnum.noPlayer);
        board.set(BoardPositionEnum.POSITION_R3C2, PlayerEnum.noPlayer);
        board.set(BoardPositionEnum.POSITION_R3C3, PlayerEnum.noPlayer);


        return board;
    }

}