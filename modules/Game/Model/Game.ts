import {Board} from "./Board";
import {User} from "../../User/Model/User";
import {BoardPositionEnum} from "./BoardPositionEnum";
import * as _ from 'underscore';
import {PlayerEnum} from "./PlayerEnum";


export class Game {

    public id;

    private board: Board;
    private playerA: User;
    private playerB: User;
    private done: boolean = false;
    private lastPlayerMoved: PlayerEnum;
    private turns: number = 0;

    public getBoard(){
        return this.board;
    }

    public isDone(): boolean {
        return this.done;
    }

    public finish() {
        this.done = true;
    }

    public setBoard(board: Board) {
        this.board = board;
    }

    public setPlayerA(player: User) {
        this.playerA = player;
    }

    public setPlayerB(player: User) {
        this.playerB = player;
    }

    public isPositionBusy(position: BoardPositionEnum) {
        return this.board.hasPlayer(position) == true;
    }

    public setMove(player: User, position: BoardPositionEnum) {

        if (!this.isPositionBusy(position)) {
            let playerToMove = this.nextPlayerMove();
            // let playerToMove = (this.playerA.getId() == this.playerB.getId()) ? this.nextPlayerMove() : this.findPlayerByPlayerId(player);

            console.log('player to move ' + playerToMove);
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
        this.lastPlayerMoved = this.nextPlayerMove();
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

    private findPlayerByPlayerId(playerId) {

        if (this.playerA.getId() == playerId) {
            return PlayerEnum.PlayerA;
        } else if (this.playerB.getId() == playerId) {
            return PlayerEnum.PlayerB
        } else {
            return PlayerEnum.noPlayer;
        }

    }
}