/// <reference path="./typings/index.d.ts" />

import {PlayerEnum} from "./modules/Game/Model/PlayerEnum";
let express = require('express');
let app = express();

import * as _ from 'underscore';
import * as DIC from './dic';
import {Game} from "./modules/Game/Model/Game";
import {EventsReference} from "./modules/Socket/Model/EventsReference";
import {UpdateBoardEvent} from "./modules/Socket/Model/Event/UpdateBoardEvent";
import {GameStatusEnum} from "./modules/Game/Model/GameStatusEnum";
import {GameErrorEvent} from "./modules/Socket/Model/Event/GameErrorEvent";
import {ChatMessage} from "./modules/Game/Model/ChatMessage";
import {NotifyPlayerEnumEvent} from "./modules/Socket/Model/Event/NotifyPlayerEnumEvent";
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

app.get('/game/:gameId', function (req, res) {

    res.render('board', {gameId: req.params.gameId})
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


            try {
                let player: PlayerEnum = container.get('app.game.service.game_manager').findSpotForGame(payload.gameId);
                container.get('app.game.service.game_manager').updatePlayerForGame(
                    payload.gameId,
                    player,
                    user
                );

                let game: Game = container.get('app.game.repository.game').find(payload.gameId);

                // events
                container.get('app.socket.service.socket').emit(new NotifyPlayerEnumEvent(game, user), user);

                if (game.getPlayerA() != undefined && game.getPlayerB() != undefined) {
                    container.get('app.game.service.game_manager').startGame(game);
                }

            } catch (e) {

                console.log('ERROR AT CONNECTING TO A GAME ' + e.getMessage());
            }


        }
    }
);


container.get('app.socket.service.socket').addSocketListener(
    EventsReference.MOVE,
    function (socket) {
        return function (payload) {
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
                console.log(e);
                container.get('app.socket.service.socket').emitToSocket(new GameErrorEvent(e), socket.id);
                console.log('movement not allowed: ' + e.getMessage());
            }
        }
    }
);

container.get('app.socket.service.socket').addSocketListener(
    EventsReference.CHAT_MESSAGE,
    function (socket) {
        return function (payload) {
            try {


                let user = container.get('app.socket.service.socket').findUserBySocket(socket.id);

                let game: Game = container.get('app.game.repository.game').find(payload.gameId);

                let player: PlayerEnum = game.findPlayerByPlayerId(user.getId());

                if (player != PlayerEnum.noPlayer) {
                    let message: ChatMessage = new ChatMessage(payload.message, player, game);
                    container.get('app.game.service.chat_manager').broadcastMessage(message);
                }

            } catch (e) {
                container.get('app.socket.service.socket').emitToSocket(new GameErrorEvent(e), socket.id);
                console.log('movement not allowed: ' + e.getMessage());
            }
        }
    }
);

container.get('app.socket.service.socket').addSocketListener(
    EventsReference.REMATCH,
    function (socket) {
        return function (payload) {
            try {

                let user = container.get('app.socket.service.socket').findUserBySocket(socket.id);

                let game: Game = container.get('app.game.repository.game').find(payload.gameId);

                let player: PlayerEnum = game.findPlayerByPlayerId(user.getId());

                if (player == PlayerEnum.noPlayer) {
                    return;
                }

                container.get('app.game.service.game_manager').rematchGame(game);

            } catch (e) {
                console.log(e);
                container.get('app.socket.service.socket').emitToSocket(new GameErrorEvent(e), socket.id);
                console.log('movement not allowed: ' + e.getMessage());
            }
        }
    }
);


setInterval(function () {
    let games = container.get('app.game.repository.game').findByStatus(GameStatusEnum.PLAYING);

    _.each(games, function (game: Game) {
        container.get('app.game.service.game_manager').troll(game.id);
    });

}, 10000);