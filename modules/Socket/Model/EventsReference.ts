export class EventsReference {

    // Emit by server
    public static UPDATE_BOARD = 'update_board';
    public static TROLL_UPDATE = 'troll_update';
    public static GAME_ERROR = 'game_error';
    public static UPDATE_CHAT = 'update_chat';

    // Emit by user
    public static DISCONNECTED = 'disconnect';
    public static CONNECT_TO_GAME = 'connect_to_game';
    public static MOVE = 'move';
    public static CHAT_MESSAGE = 'chat_message';

}