import { PackTypes, Statuses } from "../commonTypes";
import { IBuilder } from "../../../common/IBuilder";
import ResponsePacket from "./ResponsePacket";
export default class RegisterResponsePacket extends ResponsePacket {

    constructor(packetid: string, status: Statuses, type: PackTypes) {
        super();
        this.packetId = packetid;
        this.status = status;
        this.type = type;
    }

    static Builder = class implements IBuilder<RegisterResponsePacket> {
        packetid: string;
        status: Statuses;
        type: PackTypes;

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

        build(): RegisterResponsePacket {
            if(!this.packetid) {
                throw new Error("'Packet id is required'");
            }

            else if(!this.status) {
                throw new Error("'Status id is required'");
            }

            else if(!this.type) {
                throw new Error("'Type id is required'");
            }

            return new RegisterResponsePacket(this.packetid, this.status, this.type);
        }
    }
}