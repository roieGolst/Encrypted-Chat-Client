import Packet, { PackTypes } from "./Packet";

interface RegisterPacketBuilder {
    setPacketId(packetId: string): RegisterPacketBuilder;
    setUsername(username: string): RegisterPacketBuilder;
    setPassword(password: string): RegisterPacketBuilder;
    build(): RegisterPacket;
}

type UserAttributs = {
    username: string,
    password: string
}

export default class RegisterPacket extends Packet {
    private readonly userAttributs: UserAttributs;

    constructor(packetId: string, type: PackTypes, userAttributs: UserAttributs) {
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
        private userAttributs: UserAttributs;

        setPacketId(packetId: string): RegisterPacketBuilder {
            this.packetId = packetId;
            return this;
        }

        setUsername(username: string): RegisterPacketBuilder {
            this.userAttributs.username = username;
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