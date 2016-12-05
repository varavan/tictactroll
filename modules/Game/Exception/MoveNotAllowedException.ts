import {ExceptionInterface} from "./ExceptionInterface";

export class MoveNotAllowedException implements ExceptionInterface{
    private reason: string;

    constructor(reason: string){
        this.reason = reason;
    }

    public getMessage(){
        return this.reason;
    }
}