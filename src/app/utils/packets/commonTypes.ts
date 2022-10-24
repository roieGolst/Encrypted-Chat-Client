export enum PackTypes {
    Register = "register",
    Login = "login",
    CreateChat = "createChat",
    JoinChat = "joinChat",
    ChatMessage = "chatMessage",
    NewToken = "newToken",
    Error = "error", 
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