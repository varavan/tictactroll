export class MoveNotAllowedException {
    private reason: string;

    constructor(reason: string){
        this.reason = reason;
    }

    public getMessage(){
        return this.reason;
    }
}