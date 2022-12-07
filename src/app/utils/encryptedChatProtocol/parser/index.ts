import { IResult } from "../../../common/IResult";
import { PacketType, Status } from "../commonTypes";
import Packet from "../Packet";
import ResponseParser from "./Response";
import RequestParser from "./Request";
import ResponsePacket from "../responsePackets/ResponsePacket";
import * as ResponsePackets from "../responsePackets";

export class ParserErrorResult extends Error {
    readonly packetId?: string;
    readonly type: PacketType;
    readonly status: Status;

    constructor(error: { packetId?: string, type: PacketType, status: Status }) {
        super();
        this.packetId = error.packetId;
        this.type = error.type;
        this.status = error.status;
    }
}

export  default class Parser {

    static parse(data: Buffer): Packet {
        const parsedData = this.jsonParse(data.toString("utf-8"));

        if(!parsedData.isSuccess) {
            return this.generalPacketGenerator(new ParserErrorResult({
                type: PacketType.GeneralFailure,
                status: Status.InvalidPacket
            }));
        }
        

        const isValidPacket = this.isValidPacket(parsedData.value);

        if(!isValidPacket) {
            return this.generalPacketGenerator(new ParserErrorResult({
                type: PacketType.GeneralFailure,
                status: Status.InvalidPacket
            }));
        }

        const packet = parsedData.value;
        const packetId = packet.packetId;
        const packetType = this.typeCasting(packet.type);
        const packetStatus = this.statusCasting(packet.status);

        if(!packetType) {
            return this.generalPacketGenerator(new ParserErrorResult({
                type: PacketType.GeneralFailure,
                status: Status.InvalidPacket
            }));
        }

        let result: Packet;


        if(packetStatus) {
            try {
                result = ResponseParser.parse(packetType, packetId, packetStatus, packet);
            }
            catch(err: unknown) {
                throw new ParserErrorResult({
                    packetId,
                    type: packetType,
                    status: Status.GeneralFailure
                })
            }

        } else {
            try {
                result = RequestParser.parse(packetType, packetId, packet);
            }
            catch(err: unknown) {
                if(err instanceof ParserErrorResult) {
                    return this.generalPacketGenerator(err);
                }
                else {
                    throw new ParserErrorResult({
                        packetId,
                        type: packetType,
                        status: Status.GeneralFailure
                    })
                }
            }
        }

        return result;
    }

    private static jsonParse(data: string): IResult<any> {
        try {
            let packet = JSON.parse(data);

            return {
                isSuccess: true,
                value: packet
            };

        }
        catch(err) {
            return {
                isSuccess: false,
                error: `Parser error: Invalid JSON format`
            };
        }
    }

    private static isValidPacket(packet: any): boolean {
        if(!packet["type"] || !packet["packetId"]) {
            return false;
        }

        return true;
    }

    private static typeCasting(type: string): PacketType | undefined {
        try {
            let currentType: PacketType = type as PacketType;

            if(currentType) {
                return currentType;
            }
        }
        catch(e) {
            return undefined;
        }
    }

    private static statusCasting(status: number): Status | undefined {
        try {
            let currentStatus: Status = status as Status;

            if(currentStatus) {
                return currentStatus;
            }
        }
        catch(e) {
            return undefined;
        }
    }

    private static generalPacketGenerator(error: ParserErrorResult): ResponsePacket {
        return new ResponsePackets.GeneralFailure.Builder()
            .setPacketId(error.packetId)
            .setType(error.type)
            .setStatus(error.status)
            .build()
    }
}