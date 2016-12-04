export class GameNotFoundException {
    private reason: string;

    constructor(gameId: any){
        this.reason = 'Game with id ' + gameId + ' does not exists';
    }

    public getMessage(){
        return this.reason;
    }
}