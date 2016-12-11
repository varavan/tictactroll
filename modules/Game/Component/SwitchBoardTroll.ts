import {TrollInterface} from "./TrollInterface";
import {TrollTypeEnum} from "../Model/TrollTypeEnum";
import {Board} from "../Model/Board";
import {BoardPositionEnum} from "../Model/BoardPositionEnum";
import * as _ from 'underscore';
import {PlayerEnum} from "../Model/PlayerEnum";

export class SwitchBoardTroll implements TrollInterface {

    getType(): TrollTypeEnum {
        return TrollTypeEnum.LIVE;
    }

    processBoard(board: Board): Board {

        _.each(board.ALL_POSITIONS, function (position: BoardPositionEnum) {

            let player: PlayerEnum = board.get(position);

            if(player == PlayerEnum.noPlayer){
                return;
            }

            let playerChange: PlayerEnum = (player == PlayerEnum.PlayerA) ? PlayerEnum.PlayerB : PlayerEnum.PlayerA;

            board.set(position, playerChange);

        });

        return board;
    }

    processCell(board: Board, position: BoardPositionEnum): Board {

        return board;
    }

    getMessage(): string {
        return 'What about changing roles';
    }

}