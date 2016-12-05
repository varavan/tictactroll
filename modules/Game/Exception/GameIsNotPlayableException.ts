import {ExceptionInterface} from "./ExceptionInterface";

export class GameIsNotPlayableException implements ExceptionInterface{

    public getMessage(){
        return 'game is not playable';
    }
}