import { AuthAttributs, PacketType } from "../commonTypes";
import Packet from "../Packet";

interface LoginPacketBuilder {
    setPacketId(packetId: string): LoginPacketBuilder;
    setUsername(username: string): LoginPacketBuilder;
    setPassword(password: string): LoginPacketBuilder;
    build(): LoginPacket;
}

export default class LoginPacket extends Packet {
    private readonly userAttributs: AuthAttributs;

    constructor(packetId: string, type: PacketType, userAttributs: AuthAttributs) {
        super(type, packetId);
        this.userAttributs = userAttributs;
    }
    static Builder: LoginPacketBuilder = new class {
        private packetId: string
        private username: string;
        private password: string

        setPacketId(packetId: string): LoginPacketBuilder {
            this.packetId = packetId;
            return this;
        }

        setUsername(username: string): LoginPacketBuilder {
            this.username = username;
            return this;
        }

        setPassword(password: string): LoginPacketBuilder {
            this.password = password;
            return this;
        }

        build(): LoginPacket {
            return new LoginPacket(this.packetId, PacketType.Login, {userName: this.username, password: this.password});
        }
    }
}