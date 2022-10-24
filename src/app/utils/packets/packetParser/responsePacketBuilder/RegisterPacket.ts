import { PackTypes, Statuses } from "../../commonTypes";
import { IBuilder } from "../../IBuilder";
import ResponsePacket from "../../ResponsePacket";

interface IRegisterResponsePacketBuilder extends IBuilder<RegisterResponsePacket> {
    setPacketid(packetid: string): IRegisterResponsePacketBuilder;
    setStatus(status: Statuses): IRegisterResponsePacketBuilder;
    setType(type: PackTypes): IRegisterResponsePacketBuilder;
}

export default class RegisterResponsePacket extends ResponsePacket {

    constructor(packetid: string, status: Statuses, type: PackTypes, error?:string) {
        super();
        this.packetId = packetid;
        this.status = status;
        this.type = type;
        this.error = error
    }

    static Builder: IRegisterResponsePacketBuilder = new class {
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
            if(!this.packetid || !this.status || !this.type) {
                throw new Error("missing part");
            }

            return new RegisterResponsePacket(this.packetid, this.status, this.type);
        }
    }
}