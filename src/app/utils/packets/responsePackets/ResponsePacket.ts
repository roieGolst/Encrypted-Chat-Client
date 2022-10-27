import { Statuses } from "../commonTypes";
import Packet from "../Packet";

export default abstract class ResponsePacket extends Packet {
    status: Statuses;
};  