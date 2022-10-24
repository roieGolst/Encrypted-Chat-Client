import { AuthAttributs, PackTypes } from "../commonTypes";
import Packet from "../Packet";

interface RegisterPacketBuilder {
    setPacketId(packetId: string): RegisterPacketBuilder;
    setUsername(username: string): RegisterPacketBuilder;
    setPassword(password: string): RegisterPacketBuilder;
    build(): RegisterPacket;
}

export default class RegisterPacket extends Packet {
    private readonly userAttributs: AuthAttributs;

    constructor(packetId: string, type: PackTypes, userAttributs: AuthAttributs) {
        super()
        super.packetId = packetId;
        super.type = type
        this.userAttributs = userAttributs;
    }

    override toString(): string {
        return super.toString();
    }

    static Builder: RegisterPacketBuilder = new class {
        private packetId: string
        private userAttributs: AuthAttributs;

        setPacketId(packetId: string): RegisterPacketBuilder {
            this.packetId = packetId;
            return this;
        }

        setUsername(username: string): RegisterPacketBuilder {
            this.userAttributs.userName = username;
            return this;
        }

        setPassword(password: string): RegisterPacketBuilder {
            this.userAttributs.password = password;
            return this;
        }

        build(): RegisterPacket {
            return new RegisterPacket(this.packetId, PackTypes.Register, this.userAttributs);
        }
    }
}