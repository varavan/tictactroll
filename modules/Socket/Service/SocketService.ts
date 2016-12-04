/// <reference path="../../../typings/index.d.ts" />

import Server = SocketIO.Server;
import {User} from "../../User/Model/User";
import * as _ from 'underscore';
import {EventsReference} from "../Model/EventsReference";
import {EventInterface} from "../Model/Event/EventInterface";


export class SocketService {

    private eventCollection = [];
    private socketServer: any;
    private users: User[];

    constructor(socketServer: any){
        this.socketServer = socketServer;

        this.users = [];

        let self = this;

        //construct socket
        socketServer.on('connection', function (socket) {
            console.log('socket connected', socket.id);

            if(self.findUserBySocket(socket.id)){
                self.removeUser(socket.id);
            }

            let user = new User();
            user.setId(socket.id);
            user.setSocketId(socket.id);

            self.addUser(user);

            socket.on(EventsReference.DISCONNECTED, function(payload){
                console.log('a user has disconnected', payload);

                self.removeUser(socket.id);

            });

            _.forEach(self.eventCollection, function(event){
                socket.on(event.name, event.callback(socket));
            });

        });

    }

    public addSocketListener(eventName: string, callback: any) {
        console.log('connecting to a event ' + eventName);
        this.eventCollection.push({
            name: eventName,
            callback: callback
        });

        this.socketServer.on(eventName, callback);
    }

    public emit(event: EventInterface, user: User){
        this.socketServer.to(user.getSocketId()).emit(event.geEventName(), event.getEventPayload());
    }

    public findSocketByUser(userId): User{
        return _.find(this.users, function(user: User){
           return (user.getId() == userId);
        });
    }

    public findUserBySocket(socketId): User{
        return _.find(this.users, function(user: User){
            return (user.getSocketId() == socketId);
        });
    }

    private removeUser(userId){
        this.users = _.reject(this.users, function(user:User){
                return user.getId() == userId;
        })
    }

    private addUser(user: User){

        if(this.findSocketByUser(user.getId())){
            this.removeUser(user.getId());
        }

        this.users.push(user);

        console.log('User added', user);
    }

}