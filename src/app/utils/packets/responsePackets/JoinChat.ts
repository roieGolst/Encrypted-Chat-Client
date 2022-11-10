import { PacketType, Statuses } from "../commonTypes";
import { IBuilder } from "../../../common/IBuilder";
import ResponsePacket from "./ResponsePacket";

export default class JoinChatPacket extends ResponsePacket {
    readonly members?: Map<string, string> | undefined;

    constructor(packetid: string, status: Statuses, type: PacketType, members: Map<string, string> | undefined = undefined) {
        super(type, status, packetid);
        this.members = members;
    }

    static Builder = class implements IBuilder<JoinChatPacket> {
        packetid: string;
        type: PacketType;
        status: Statuses;
        members?: Map<string, string>;

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

        setMembers(members: Map<string, string>): this {
            this.members = members;
            return this;
        }

        build(): JoinChatPacket {
            if(!this.packetid) {
                throw new Error("'PacketId' is required");
            }

            else if(!this.status) {
                throw new Error("'Status' is required");
            }

            else if(!this.type) {
                throw new Error("'Type' is required");
            }

            return new JoinChatPacket(this.packetid, this.status, this.type, this.members);
        }
    }
}