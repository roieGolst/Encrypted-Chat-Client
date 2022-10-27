import { PackTypes, Statuses, Tokens } from "../commonTypes";
import { IBuilder } from "../../../common/IBuilder";
import ResponsePacket from "./ResponsePacket";

type UserAttributs = {
    username: string,
    userId: string
}



export default class LoginResponsePacket extends ResponsePacket {
    readonly userAttributs: UserAttributs;
    readonly tokens: Tokens;

    constructor(packetid: string, status: Statuses, type: PackTypes, userAttributs: UserAttributs, tokens: Tokens) {
        super();
        this.packetId = packetid;
        this.status = status;
        this.type = type;
        this.userAttributs = userAttributs;
        this.tokens = tokens;
    }

    static Builder = class implements IBuilder<LoginResponsePacket> {
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
            if(this.status == Statuses.Failed) {
                if(!this.packetid) {
                    throw new Error("'Packet id is required'");
                }
    
                else if(!this.status) {
                    throw new Error("'Status id is required'");
                }
    
                else if(!this.type) {
                    throw new Error("'Type id is required'");
                }
                
            } else {
                if(!this.packetid) {
                    throw new Error("'Packet id is required'");
                }
    
                else if(!this.status) {
                    throw new Error("'Status id is required'");
                }
    
                else if(!this.type) {
                    throw new Error("'Type id is required'");
                }
    
                else if(!this.userAttributs) {
                    throw new Error("'UserAttributs id is required'");
                }
    
                else if(!this.tokens) {
                    throw new Error("'Tokens id is required'");
                }
            }

            return new LoginResponsePacket(this.packetid, this.status, this.type, this.userAttributs, this.tokens);
        }
    }
}