export enum PackTypes {
    Register = "register",
    Login = "login",
    CreateChat = "createChat",
    JoinChat = "joinChat",
    ChatMessage = "chatMessage",
    NewToken = "newToken",
    Error = "error", 
}

export default abstract class Packet {
    protected packetId: string;
    protected type: PackTypes;

    toString(): string {
        return JSON.stringify(this);
    };
};