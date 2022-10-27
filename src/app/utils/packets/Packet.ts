import { PackTypes } from "./commonTypes";
import { v4 } from 'uuid';

export default abstract class Packet {
    packetId: string = v4()
    type: PackTypes;

    toString(): string {
        return JSON.stringify(this);
    };
};