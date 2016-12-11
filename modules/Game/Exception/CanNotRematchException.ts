import {ExceptionInterface} from "./ExceptionInterface";

export class CanNotRematchException implements ExceptionInterface{

    public getMessage(){
        return 'Can not rematch game';
    }
}