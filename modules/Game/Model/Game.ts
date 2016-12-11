import {Board} from "./Board";
import {User} from "../../User/Model/User";
import {BoardPositionEnum} from "./BoardPositionEnum";
import * as _ from 'underscore';
import {PlayerEnum} from "./PlayerEnum";
import {GameStatusEnum} from "./GameStatusEnum";
import {MoveNotAllowedException} from "../Exception/MoveNotAllowedException";


export class Game {

    public id;

    private board: Board;
    private playerA: User;
    private playerB: User;
    private status: GameStatusEnum;
    private done: boolean = false;
    private lastPlayerMoved: PlayerEnum;
    private turns: number = 0;
    private totalTurn: number = 0;
    private winsPlayerA: number = 0;
    private winsPlayerB: number = 0;

    public getBoard(){
        return this.board;
    }

    public isDone(): boolean {
        return this.done;
    }

    public finish() {
        this.status = GameStatusEnum.DONE;
        this.done = true;

        this.totalTurn = this.totalTurn + this.turns;

        if(this.playerDone() == PlayerEnum.PlayerA){
            this.winsPlayerA++;
        }else if(this.playerDone() == PlayerEnum.PlayerB){
            this.winsPlayerB++;
        }

        this.turns = 0;
    }

    public setBoard(board: Board) {
        this.board = board;
    }

    public cleanBoard(){

        if(!this.done){
            return;
        }

        let context = this;

        _.each(this.board.ALL_POSITIONS, function (position) {
            context.board.set(position, PlayerEnum.noPlayer);
        });

        context = null;

        this.done = false;
        this.status = GameStatusEnum.READY_TO_START;

    }

    public setPlayerA(player: User) {
        this.playerA = player;
    }

    public setPlayerB(player: User) {
        this.playerB = player;
    }

    public getPlayerSpotAvailable(){
        return (this.playerA == undefined)
            ? PlayerEnum.PlayerA
            : (this.playerB == undefined)
                ? PlayerEnum.PlayerB
                : PlayerEnum.noPlayer;
    }
    public isPositionBusy(position: BoardPositionEnum) {
        return this.board.hasPlayer(position) == true;
    }

    public getStatus(){
        return this.status;
    }

    public setStatus(status: GameStatusEnum){
        this.status = status;
    }

    public getWinsPlayerA(): number{
        return this.winsPlayerA;
    }

    public getWinsPlayerB(): number{
        return this.winsPlayerB;
    }

    public getTotalTurns(): number{
        return this.totalTurn;
    }

    public setMove(player: User, position: BoardPositionEnum) {

        if (!this.isPositionBusy(position)) {
            // let playerToMove = this.nextPlayerMove();

            let playerToMove: PlayerEnum;

            if((this.playerA.getId() == this.playerB.getId())){
                playerToMove = this.nextPlayerMove();
            }else{
                playerToMove = this.findPlayerByPlayerId(player.getId());

                if(playerToMove == this.lastPlayerMoved){
                    throw new MoveNotAllowedException("You moved last time");
                }
            }


            this.board.set(
                position,
                playerToMove
            );

            this.nextTurn();

        }
    }

    public nextPlayerMove(){
        return (this.lastPlayerMoved == PlayerEnum.PlayerB) ? PlayerEnum.PlayerA : PlayerEnum.PlayerB;
    }

    private nextTurn(){
        this.turns++;
        this.setLastPlayerMoved(this.nextPlayerMove());
    }

    public setLastPlayerMoved(player: PlayerEnum){
        this.lastPlayerMoved = player;
    }

    public getPlayer(player: PlayerEnum): User{
        return (player == PlayerEnum.PlayerA)
            ? this.getPlayerA()
            : (player == PlayerEnum.PlayerB)
                ? this.getPlayerB()
                : undefined;
    }

    public getPlayerA() {
        return this.playerA;
    }

    public getPlayerB(){
        return this.playerB;
    }

    public playerDone(): PlayerEnum {

        // hor

        let board = this.board;

        let winner = PlayerEnum.noPlayer;

        _.each(this.board.ALL_POSIBLES_WINNING_MOVES, function (moves) {
            let sumRow: number = 0;

            _.each(moves, function (position: BoardPositionEnum) {
                sumRow += board.get(position);
            });

            if (sumRow == 3) {
                winner = PlayerEnum.PlayerA;
            }

            if (sumRow == 30) {
                winner = PlayerEnum.PlayerB;
            }
        });


        return winner;
    }

    public findPlayerByPlayerId(playerId) {

        if (this.playerA != undefined && this.playerA.getId() == playerId) {
            return PlayerEnum.PlayerA;
        } else if (this.playerB != undefined && this.playerB.getId() == playerId) {
            return PlayerEnum.PlayerB
        } else {
            return PlayerEnum.noPlayer;
        }

    }
}