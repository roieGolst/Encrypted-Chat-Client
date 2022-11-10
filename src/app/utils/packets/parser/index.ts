import { IResult } from "../../../common/IResult";
import { PacketType, Statuses } from "../commonTypes";
import ResponsePacket from "../responsePackets/ResponsePacket";
import * as ResponsePacketBuilder from "../responsePackets";
import LoginResponsePacket from "../responsePackets/Login";
import RegisterResponsePacket from "../responsePackets/Register";
import CreateChatResponsePacket from "../responsePackets/CreateChat";
import Packet from "../Packet";

export interface IParser<T> {
    parse(data: any): IResult<T>;
}

class Parser implements IParser<Packet>{
    private type: PacketType;
    private packetId: string;

    private jsonParse(data: string): IResult<any> {
        try {
            let packet = JSON.parse(data);

            return {
                result: packet
            };

        }
        catch(err) {
            return {
                isError: `Parser error: Invalid JSON format`
            };
        }
    }

    parse(data: Buffer): IResult<Packet> {
        const stringData = data.toString("utf-8");

        const parsedData = this.jsonParse(stringData);

        if(!parsedData.result) {
            return {
                isError: parsedData.isError
            };
        }

        const packet = parsedData.result;

        if(!packet["type"] || !packet["packetId"]) {
            return {
                isError: "Invalid packet"
            }
        }

        this.packetId = packet.packetId;

        const typeCastingResult = this.typeCasting(packet.type)

        if(!typeCastingResult.result) {
            return {
                isError: typeCastingResult.isError
            };
        }

        this.type = typeCastingResult.result;

        if(packet["status"]) {
            return this.responseParser(this.type, this.packetId, packet["status"], packet);
        } else {
            return {
                isError: "Request packet not allowed yet :("
            };
        }
    }

    private typeCasting(type: string): IResult<PacketType> {
        let currentType: PacketType;

        switch(type) {
            case "register": {
                currentType = PacketType.Register
                break;
            }

            case "login": {
                currentType = PacketType.Login
                break;
            }

            case "createChat": {
                currentType = PacketType.CreateChat
                break;
            }

            case "joinChat": {
                currentType = PacketType.JoinChat
                break;
            }

            case "newRoomMember": {
                currentType = PacketType.NewRoomMember
                break;
            }

            case "chatMessage": {
                currentType = PacketType.ChatMessage
                break;
            }

            case "newToken": {
                currentType = PacketType.NewToken
                break;
            }

            default : {
                return {
                    isError: "Invalid packet 'type'"
                };
            }
        }

        return {
            result: currentType
        };
    }

    private responseParser(type: PacketType, packetId: string, status: Statuses, payload: any): IResult<Packet> {
        switch(type) {
            case PacketType.Register : {
                return this.parseRegisterResponse(type, packetId, status);
            }

            case PacketType.Login : {
                return this.parseLoginResponse(type, packetId, status, payload);
            }

            default : {
                return {
                    isError: "Invalid packet type."
                };
            }
        }
    }

    private parseRegisterResponse(type: PacketType, packetId: string, status: Statuses): IResult<Packet> {
        return {
            result: new RegisterResponsePacket.Builder()
                .setPacketid(packetId)
                .setType(type)
                .setStatus(status)
                .build()
        };
    }

    private parseLoginResponse(type: PacketType, packetId: string, status: Statuses, payload: any): IResult<Packet> {
        if(!payload["userAttributs"] || !payload["tokens"]) {
            return {
                isError: "Invalid packet"
            };
        }

        return {
            result: new LoginResponsePacket.Builder()
                .setPacketid(packetId)
                .setType(type)
                .setStatus(status)
                .setUserAttributs(payload.userAttributs)
                .setTokens(payload.tokens)
                .build()
        };
    }
}

export default new Parser();