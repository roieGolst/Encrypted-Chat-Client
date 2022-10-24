import { PackTypes, Statuses, Tokens } from "../../commonTypes";
import { IBuilder } from "../../IBuilder";
import ResponsePacket from "../../ResponsePacket";

interface ILoginResponsePacketBuilder extends IBuilder<LoginResponsePacket> {
    setPacketid(packetid: string): ILoginResponsePacketBuilder;
    setStatus(status: Statuses): ILoginResponsePacketBuilder;
    setType(type: PackTypes): ILoginResponsePacketBuilder;
    setUserAttributs(userAttributs: UserAttributs): ILoginResponsePacketBuilder;
    setTokens(tokens: Tokens): ILoginResponsePacketBuilder;
}

type UserAttributs = {
    username: string,
    userId: string
}



export default class LoginResponsePacket extends ResponsePacket {
    userAttributs: UserAttributs;
    tokens: Tokens;

    constructor(packetid: string, status: Statuses, type: PackTypes, userAttributs: UserAttributs, tokens: Tokens, error?:string) {
        super();
        this.packetId = packetid;
        this.status = status;
        this.type = type;
        this.userAttributs = userAttributs;
        this.tokens = tokens;
        this.error = error
    }

    static Builder: ILoginResponsePacketBuilder = new class {
        packetid: string;
        status: Statuses;
        type: PackTypes;
        userAttributs: UserAttributs;
        tokens: Tokens;

        setPacketid(packetid: string): this {
            this.packetid = packetid;
            return this;
        }

        setStatus(status: Statuses): this {
            this.status = status;
            return this;
        }

        setType(type: PackTypes): this {
            this.type = type;
            return this;
        }

        setUserAttributs(userAttributs: UserAttributs): this {
            this.userAttributs = userAttributs;
            return this;
        }

        setTokens(tokens: Tokens): this {
            this.tokens = tokens;
            return this;
        }

        build(): LoginResponsePacket {
            if(!this.packetid || !this.status || !this.type || !this.userAttributs || !this.tokens) {
                throw new Error("missing part");
            }

            return new LoginResponsePacket(this.packetid, this.status, this.type, this.userAttributs, this.tokens);
        }
    }
}