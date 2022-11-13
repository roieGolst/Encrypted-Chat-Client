import { PacketType, Statuses } from "../commonTypes";
import { IBuilder } from "../../../common/IBuilder";
import ResponsePacket from "./ResponsePacket";

export default class ChatMessagePacket extends ResponsePacket {

    constructor(packetId: string, status: Statuses, type: PacketType) {
        super(type, status, packetId);
    }

    static Builder = class implements IBuilder<ChatMessagePacket> {
        packetId: string;
        status: Statuses;
        type: PacketType;

        setPacketId(packetId: string): this {
            this.packetId = packetId;
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
            if(!this.packetId) {
                throw new Error("'Packet id is required");
            }

            else if(!this.status) {
                throw new Error("'Status' is required");
            }

            else if(!this.type) {
                throw new Error("'Type' is required");
            }

            return new ChatMessagePacket(this.packetId, this.status, this.type);
        }
    }
}