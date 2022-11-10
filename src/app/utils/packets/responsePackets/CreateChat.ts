import { PacketType, Statuses } from "../commonTypes";
import { IBuilder } from "../../../common/IBuilder";
import ResponsePacket from "./ResponsePacket";

export default class CreateChatResponsePacket extends ResponsePacket {
    readonly roomId: string

    constructor(packetid: string, status: Statuses, type: PacketType, roomId: string) {
        super(type, status, packetid);
        this.roomId = roomId;
    }

    static Builder = class implements IBuilder<CreateChatResponsePacket> {
        packetid: string;
        type: PacketType;
        status: Statuses;
        roomId: string;

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

        setRoomId(roomId: string): this {
            this.roomId = roomId;
            return this;
        }

        build(): CreateChatResponsePacket {
            if(this.status == Statuses.Failed) {
                if(!this.packetid) {
                    throw new Error("'Packet' id is required");
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
    
                else if(!this.roomId) {
                    throw new Error("'Room' id id is required");
                }
            }

            return new CreateChatResponsePacket(this.packetid, this.status, this.type, this.roomId);
        }
    }
}