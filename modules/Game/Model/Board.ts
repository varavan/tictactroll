import {PlayerEnum} from "./PlayerEnum";
import {BoardPositionEnum} from "./BoardPositionEnum";


export class Board {

    public id;

    public ROW_1 = [BoardPositionEnum.POSITION_R1C1,BoardPositionEnum.POSITION_R1C2,BoardPositionEnum.POSITION_R1C3,];
    public ROW_2 = [BoardPositionEnum.POSITION_R2C1,BoardPositionEnum.POSITION_R2C2,BoardPositionEnum.POSITION_R2C3,];
    public ROW_3 = [BoardPositionEnum.POSITION_R3C1,BoardPositionEnum.POSITION_R3C2,BoardPositionEnum.POSITION_R3C3];

    public COL_1 = [BoardPositionEnum.POSITION_R1C1,BoardPositionEnum.POSITION_R2C1,BoardPositionEnum.POSITION_R3C1];
    public COL_2 = [BoardPositionEnum.POSITION_R1C2,BoardPositionEnum.POSITION_R2C2,BoardPositionEnum.POSITION_R3C2];
    public COL_3 = [BoardPositionEnum.POSITION_R1C3,BoardPositionEnum.POSITION_R2C3,BoardPositionEnum.POSITION_R3C3];

    public DIAGONAL_1 = [BoardPositionEnum.POSITION_R1C1,BoardPositionEnum.POSITION_R2C2,BoardPositionEnum.POSITION_R3C3];
    public DIAGONAL_2 = [BoardPositionEnum.POSITION_R1C3,BoardPositionEnum.POSITION_R2C2,BoardPositionEnum.POSITION_R3C1];

    public ROWS = [this.ROW_1, this.ROW_2, this.ROW_3];
    public COLS = [this.COL_1, this.COL_2, this.COL_3];

    public ALL_POSIBLES_WINNING_MOVES = [this.ROW_1, this.ROW_2, this.ROW_3,this.COL_1, this.COL_2, this.COL_3,this.DIAGONAL_1, this.DIAGONAL_2];

    private POSITION_R1C1: PlayerEnum;
    private POSITION_R1C2: PlayerEnum;
    private POSITION_R1C3: PlayerEnum;

    private POSITION_R2C1: PlayerEnum;
    private POSITION_R2C2: PlayerEnum;
    private POSITION_R2C3: PlayerEnum;

    private POSITION_R3C1: PlayerEnum;
    private POSITION_R3C2: PlayerEnum;
    private POSITION_R3C3: PlayerEnum;

    constructor(
        POSITION_R1C1:PlayerEnum = PlayerEnum.noPlayer,
        POSITION_R1C2:PlayerEnum = PlayerEnum.noPlayer,
        POSITION_R1C3:PlayerEnum = PlayerEnum.noPlayer,
        POSITION_R2C1:PlayerEnum = PlayerEnum.noPlayer,
        POSITION_R2C2:PlayerEnum = PlayerEnum.noPlayer,
        POSITION_R2C3:PlayerEnum = PlayerEnum.noPlayer,
        POSITION_R3C1:PlayerEnum = PlayerEnum.noPlayer,
        POSITION_R3C2:PlayerEnum = PlayerEnum.noPlayer,
        POSITION_R3C3:PlayerEnum = PlayerEnum.noPlayer
    ) {
        this.POSITION_R1C1 = POSITION_R1C1;
        this.POSITION_R1C2 = POSITION_R1C2;
        this.POSITION_R1C3 = POSITION_R1C3;

        this.POSITION_R2C1 = POSITION_R2C1;
        this.POSITION_R2C2 = POSITION_R2C2;
        this.POSITION_R2C3 = POSITION_R2C3;

        this.POSITION_R3C1 = POSITION_R3C1;
        this.POSITION_R3C2 = POSITION_R3C2;
        this.POSITION_R3C3 = POSITION_R3C3;

    }

    public get(position: BoardPositionEnum): PlayerEnum{
        let value: PlayerEnum = PlayerEnum.noPlayer;

        if(position == BoardPositionEnum.POSITION_R1C1){
            value = this.POSITION_R1C1;
        }else if(position == BoardPositionEnum.POSITION_R1C2){
            value = this.POSITION_R1C2;
        }else if(position == BoardPositionEnum.POSITION_R1C3){
            value = this.POSITION_R1C3;
        }else  if(position == BoardPositionEnum.POSITION_R2C1){
            value = this.POSITION_R2C1;
        }else if(position == BoardPositionEnum.POSITION_R2C2){
            value = this.POSITION_R2C2;
        }else if(position == BoardPositionEnum.POSITION_R2C3){
            value = this.POSITION_R2C3;
        } if(position == BoardPositionEnum.POSITION_R3C1){
            value = this.POSITION_R3C1;
        }else if(position == BoardPositionEnum.POSITION_R3C2){
            value = this.POSITION_R3C2;
        }else if(position == BoardPositionEnum.POSITION_R3C3){
            value = this.POSITION_R3C3;
        }

        return value;
    }

    public set(position: BoardPositionEnum, player: PlayerEnum){

        if(position == BoardPositionEnum.POSITION_R1C1){
            this.POSITION_R1C1 = player;
        }else if(position == BoardPositionEnum.POSITION_R1C2){
            this.POSITION_R1C2 = player;
        }else if(position == BoardPositionEnum.POSITION_R1C3){
            this.POSITION_R1C3 = player;
        }else  if(position == BoardPositionEnum.POSITION_R2C1){
            this.POSITION_R2C1 = player;
        }else if(position == BoardPositionEnum.POSITION_R2C2){
            this.POSITION_R2C2 = player;
        }else if(position == BoardPositionEnum.POSITION_R2C3){
            this.POSITION_R2C3 = player;
        } if(position == BoardPositionEnum.POSITION_R3C1){
            this.POSITION_R3C1 = player;
        }else if(position == BoardPositionEnum.POSITION_R3C2){
            this.POSITION_R3C2 = player;
        }else if(position == BoardPositionEnum.POSITION_R3C3){
            this.POSITION_R3C3 = player;
        }
    }

    public hasPlayer(position: BoardPositionEnum){

        let value = this.get(position);

        return value != PlayerEnum.noPlayer;
    }

}