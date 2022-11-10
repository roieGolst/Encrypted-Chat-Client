export enum PacketType {
    Register = "register",
    Login = "login",
    CreateChat = "createChat",
    JoinChat = "joinChat",
    NewRoomMember = "newRoomMember",
    ChatMessage = "chatMessage",
    NewToken = "newToken",
};

export enum Statuses {
    Succeeded = "succeeded",
    Failed = "failed"
};

export type AuthAttributs = {
    userName: string,
    password: string
};

export type Tokens = {
    token: string,
    refreshToken?: string
};