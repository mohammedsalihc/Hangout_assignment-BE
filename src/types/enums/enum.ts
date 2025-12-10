export enum ERole {
    USER = "user"
}

export enum EActivityType {
    SHOPPING = "shopping",
    READING = "reading",
    GAME = "game"
}

export enum SocketIOEvent{
    CONNECTION = 'connection',
    DISCONNECT = 'disconnect',
    MESSAGE = 'message',
    JOIN_ROOM = "join_room",
    USER_JOINED = "user_joined",
    LEAVE_ROOM  = "leave_room",
    USER_LEAVED = "user_leaved"
}