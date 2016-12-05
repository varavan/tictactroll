import {ExceptionInterface} from "./ExceptionInterface";
export class GameNotFoundException implements ExceptionInterface {
    private reason: string;

    constructor(gameId: any){
        this.reason = 'Game with id ' + gameId + ' does not exists';
    }

    public getMessage(){
        return this.reason;
    }
}