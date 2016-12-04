export class User {
    public static NO_SOCKET = '_%NOSOCKETCONNECTED%_';

    private id: any;
    private socketId: string = User.NO_SOCKET;

    public getId(){
        return this.id;
    }

    public setId(id){
        this.id = id;
    }
    public setSocketId(socketId){
        this.socketId = socketId;
    }

    public getSocketId(): string{
        return this.socketId;
    }

    public isConnectedToSocket(){
        return (this.socketId != User.NO_SOCKET);
    }

}