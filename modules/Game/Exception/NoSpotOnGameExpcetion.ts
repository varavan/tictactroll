import {ExceptionInterface} from "./ExceptionInterface";
export class NoSpotOnGameExpcetion implements ExceptionInterface {
    public getMessage(){
        return 'there is no spot on this game';
    }
}