import {SocketService} from "./modules/Socket/Service/SocketService";
import {GameManager} from "./modules/Game/Service/GameManager";
import {OnMemoryGameRepository} from "./modules/Game/Repository/OnMemoryGameRepository";
import {EmptyUpperDiagonalTroll} from "./modules/Game/Component/EmptyUpperDiagonalTroll";
import {EmptyDownDiagonalTroll} from "./modules/Game/Component/EmptyDownDiagonalTroll";
import {SkipLastMovementTroll} from "./modules/Game/Component/SkipLastMovementTroll";
import {ChatManager} from "./modules/Game/Service/ChatManager";
import {SwitchBoardTroll} from "./modules/Game/Component/SwitchBoardTroll";
import {SwitchEmptyByPlayedCellsTroll} from "./modules/Game/Component/SwitchEmptyByPlayedCellsTroll";

let io = require('socket.io')(8021);

let dic: any;
dic = require('simple-dijs');

interface Container {
    get(serviceName: string);
}

export function buildContainer(): Container {

    let di = new dic();

    // // Config Module
    // di.set('app.config.service.config',
    //     // this data can be overwritten by env vars
    //     new AppConfigService(
    //         EnvironmentType.ENVIRONMENT_DEVELOPMENT,
    //         LogLevelType.LOG_LEVEL_INFO,
    //         8080,
    //         ['trivago-originalimages'],
    //         'trv-resizing-on-the-fly-public',
    //         false
    //     )
    // );

    di.set('app.socket.service.socket', new SocketService(io));

    di.set('app.game.repository.game', new OnMemoryGameRepository());

    di.set('app.game.service.chat_manager', new ChatManager(di.get('app.socket.service.socket')));
    di.set('app.game.service.game_manager', new GameManager(
        di.get('app.game.repository.game'),
        di.get('app.socket.service.socket')
    ));

    // trolls
    di.get('app.game.service.game_manager').addTroll(new EmptyUpperDiagonalTroll());
    di.get('app.game.service.game_manager').addTroll(new EmptyDownDiagonalTroll());
    di.get('app.game.service.game_manager').addTroll(new SkipLastMovementTroll());
    di.get('app.game.service.game_manager').addTroll(new SwitchBoardTroll());
    di.get('app.game.service.game_manager').addTroll(new SwitchEmptyByPlayedCellsTroll());


    return di;
}