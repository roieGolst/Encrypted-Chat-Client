import { PacketType, Statuses } from "../commonTypes";
import { IBuilder } from "../../../common/IBuilder";
import ResponsePacket from "./ResponsePacket";

export default class ChatMessagePacket extends ResponsePacket {

    constructor(packetid: string, status: Statuses, type: PacketType) {
        super(type, status, packetid);
    }

    static Builder = class implements IBuilder<ChatMessagePacket> {
        packetid: string;
        status: Statuses;
        type: PacketType;

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

        build(): ChatMessagePacket {
            if(!this.packetid) {
                throw new Error("'Packet id is required");
            }

            else if(!this.status) {
                throw new Error("'Status' is required");
            }

            else if(!this.type) {
                throw new Error("'Type' is required");
            }

            return new ChatMessagePacket(this.packetid, this.status, this.type);
        }
    }
}