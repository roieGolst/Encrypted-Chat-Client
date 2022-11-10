import { PacketType, Statuses, Tokens } from "../commonTypes";
import { IBuilder } from "../../../common/IBuilder";
import ResponsePacket from "./ResponsePacket";

export default class NewToken extends ResponsePacket {
    readonly token: Tokens;

    constructor(packetid: string, status: Statuses, type: PacketType, token: Tokens) {
        super(type, status, packetid);
        this.token = token;
    }

    static Builder = class implements IBuilder<NewToken> {
        packetid: string;
        type: PacketType;
        status: Statuses;
        token: Tokens;

        setPacketid(packetid: string): this {
            this.packetid = packetid;
            return this;
        }
        
        setType(type: PacketType): this {
            this.type = type;
            return this;
        }

        setStatus(status: Statuses): this {
            this.status = status;
            return this;
        }

        setToken(token: Tokens): this {
            this.token = token;
            return this;
        }

        build(): NewToken {
            if(!this.packetid) {
                throw new Error("'Packet' id is required");
            }

            else if(!this.status) {
                throw new Error("'Status' id is required");
            }

            else if(!this.type) {
                throw new Error("'Type' id is required");
            }

            else if(!this.token) {
                throw new Error("'Token' is is required");
            }

            return new NewToken(this.packetid, this.status, this.type, this.token);
        }
    }
}