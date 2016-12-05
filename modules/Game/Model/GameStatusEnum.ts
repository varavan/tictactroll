export enum GameStatusEnum {
    INIT = 1,
    WAITING_FOR_PLAYERS = 2,
    READY_TO_START = 3, // all the players have been set
    PLAYING = 4,
    PAUSED = 5,
    STOPPED = 6,
    DONE = 7
}