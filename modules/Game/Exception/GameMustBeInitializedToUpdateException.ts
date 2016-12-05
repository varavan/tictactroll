import {ExceptionInterface} from "./ExceptionInterface";
export class GameMustBeInitializedToUpdateException implements ExceptionInterface {

    public getMessage(){
        return 'game must be initialized';
    }
}