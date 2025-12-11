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
    USER_LEAVED = "user_leaved",
    CLICK_EVENT = "click_event",
    USER_CLICKED = "user_clicked",
    SCROLL_UPDATE = "scroll_update",
    SCROLL_UPDATED = "scroll_updated",
    PAGE_CHANGE = "page_change",
    PAGE_CHANGED = "page_changed"
}