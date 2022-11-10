import { PacketType } from "../commonTypes";
import Packet from "../Packet";

export default abstract class RequestPackets extends Packet {
    constructor(type: PacketType, packetId?: string) {
        super(type, packetId);
    }
};