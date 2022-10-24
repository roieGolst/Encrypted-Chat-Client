import { PackTypes } from "./commonTypes";

export default abstract class Packet {
    packetId: string;
    type: PackTypes;

    toString(): string {
        return JSON.stringify(this);
    };
};