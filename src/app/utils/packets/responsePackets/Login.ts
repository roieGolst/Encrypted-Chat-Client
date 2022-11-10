import { PacketType, Statuses, Tokens } from "../commonTypes";
import { IBuilder } from "../../../common/IBuilder";
import ResponsePacket from "./ResponsePacket";

type UserAttributs = {
    username: string,
    userId: string
}

export default class LoginResponsePacket extends ResponsePacket {
    readonly userAttributs: UserAttributs;
    readonly tokens: Tokens;

    constructor(packetid: string, status: Statuses, type: PacketType, userAttributs: UserAttributs, tokens: Tokens) {
        super(type, status, packetid)
        this.userAttributs = userAttributs;
        this.tokens = tokens;
    }

    static Builder = class implements IBuilder<LoginResponsePacket> {
        private packetid: string;
        private status: Statuses;
        private type: PacketType;
        private userAttributs: UserAttributs;
        private tokens: Tokens;

        setPacketid(packetid: string): this {
            this.packetid = packetid;
            return this;
        }

        setStatus(status: Statuses): this {
            this.status = status;
            return this;
        }

        setType(type: PacketType): this {
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
            if(this.status == Statuses.Failed) {
                if(!this.packetid) {
                    throw new Error("'PacketId' is required");
                }
    
                else if(!this.status) {
                    throw new Error("'Status' is required");
                }
    
                else if(!this.type) {
                    throw new Error("'Type' is required");
                }
                
            } else {
                if(!this.packetid) {
                    throw new Error("'Packet' id is required");
                }
    
                else if(!this.status) {
                    throw new Error("'Status' is required");
                }
    
                else if(!this.type) {
                    throw new Error("'Type' is required");
                }
    
                else if(!this.userAttributs) {
                    throw new Error("'UserAttributs' is required");
                }
    
                else if(!this.tokens) {
                    throw new Error("'Tokens' is required");
                }
            }

            return new LoginResponsePacket(requireNotNull(this.packetid), this.status, this.type, this.userAttributs, this.tokens);
        }
    }
}

function requireNotNull<T>(arg?: T): T {
    if(!arg) {
        throw new Error("null is not allowed");
    }

    return arg;
}