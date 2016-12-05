import {Game} from "../Model/Game";
import {GameStatusEnum} from "../Model/GameStatusEnum";
import {User} from "../../User/Model/User";

export interface GameRepositoryInterface {

    create(game: Game): Game;

    update(game: Game): Game;

    find(gameId): Game;

    findAll(): Game[];

    findByStatus(status: GameStatusEnum): Game[];

    findByPlayerAndStatus(user: User, status: GameStatusEnum): Game[];
}