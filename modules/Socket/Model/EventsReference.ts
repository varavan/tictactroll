export class EventsReference {

    // Emit by server
    public static UPDATE_BOARD = 'update_board';
    public static TROLL_UPDATE = 'troll_update';
    public static GAME_ERROR = 'game_error';
    public static UPDATE_CHAT = 'update_chat';
    public static WARN_NEXT_TURN = 'next_turn';
    public static NOTIFY_PLAYER_ENUM = 'notify_player_enum';
    public static GAME_IS_DONE = 'game_is_done';
    public static PLAYER_ABANDONED = 'player_abandoned';
    public static WINNER_PLAYER = 'winner_player';
    public static RESUME_GAME = 'resume_game';

    // Emit by user
    public static DISCONNECTED = 'disconnect';
    public static CONNECT_TO_GAME = 'connect_to_game';
    public static MOVE = 'move';
    public static CHAT_MESSAGE = 'chat_message';
    public static REMATCH = 'rematch';

}