/// <reference path="./typings/index.d.ts" />

import {PlayerEnum} from "./modules/Game/Model/PlayerEnum";
let express = require('express');
let app = express();

import * as _ from 'underscore';
import * as DIC from './dic';
import {Game} from "./modules/Game/Model/Game";
import {EventsReference} from "./modules/Socket/Model/EventsReference";
import {UpdateBoardEvent} from "./modules/Socket/Model/Event/UpdateBoardEvent";
let container = DIC.buildContainer();

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.render('index', {title: 'Hey', message: 'Hello there!'})
});

app.get('/new', function (req, res) {

    let game = container.get('app.game.service.game_manager').create();

    res.render('board', {gameId: game.id})
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

// sockets

container.get('app.socket.service.socket').addSocketListener(
    EventsReference.CONNECT_TO_GAME,
    function (socket) {
        return function (payload) {

            let user = container.get('app.socket.service.socket').findUserBySocket(socket.id);

            container.get('app.game.service.game_manager').updatePlayerForGame(
                payload.gameId,
                PlayerEnum.PlayerA,
                user
            );

            container.get('app.game.service.game_manager').updatePlayerForGame(
                payload.gameId,
                PlayerEnum.PlayerB,
                user
            );

            let game: Game = container.get('app.game.repository.game').find(payload.gameId);

            let event = new UpdateBoardEvent(game.getBoard());
            container.get('app.socket.service.socket').emit(event, game.getPlayerA());
            container.get('app.socket.service.socket').emit(event, game.getPlayerB());

        }
    }
);


container.get('app.socket.service.socket').addSocketListener(
    EventsReference.MOVE,
    function (socket) {
        return function (payload) {
            console.log(payload);
            let user = container.get('app.socket.service.socket').findUserBySocket(socket.id);

            try {
                container.get('app.game.service.game_manager').move(
                    payload.gameId,
                    user,
                    payload.position
                );


                let game: Game = container.get('app.game.repository.game').find(payload.gameId);

                let event = new UpdateBoardEvent(game.getBoard());
                container.get('app.socket.service.socket').emit(event, game.getPlayerA());
                container.get('app.socket.service.socket').emit(event, game.getPlayerB());

            } catch (e) {
                console.log('movement not allowed: ' + e.getMessage());
            }
        }
    }
);

setInterval(function(){
    console.log('Trolling');
    let games = container.get('app.game.repository.game').findAll();

    _.each(games, function(game: Game){
        container.get('app.game.service.game_manager').troll(game.id);
    });

}, 30000);