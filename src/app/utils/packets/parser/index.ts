import { IResult } from "../../../common/IResult";
import { PacketType, Statuses } from "../commonTypes";
import * as ResponsePacketBuilder from "../responsePackets";
import Packet from "../Packet";
import { SingleMember } from "../responsePackets/NewRoomMember";

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

            case PacketType.CreateChat : {
                return this.parseCreateChatResponse(type, packetId, status, payload)
            }

            case PacketType.JoinChat : {
                return this.parseJoinChatResponse(type, packetId, status, payload);
            }

            case PacketType.NewRoomMember : {
                return this.parseNewRoomMemberResponse(type, packetId, status, payload);
            }

            case PacketType.NewToken : {
                return this.parseNewTokenResponse(type, packetId, status, payload);
            }

            case PacketType.ChatMessage : {
                return this.parseChatMessageResponse(type, packetId, status);
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
            result: new ResponsePacketBuilder.RegisterResponse.Builder()
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
            result: new ResponsePacketBuilder.LoginResponse.Builder()
                .setPacketid(packetId)
                .setType(type)
                .setStatus(status)
                .setUserAttributs(payload.userAttributs)
                .setTokens(payload.tokens)
                .build()
        };
    }

    private parseCreateChatResponse(type: PacketType, packetId: string, status: Statuses, payload: any): IResult<Packet> {
        if(!payload["roomId"]) {
            return {
                isError: "Invalid packet"
            };
        }

        return {
            result: new ResponsePacketBuilder.CreateChatResponse.Builder()
                .setType(type)
                .setPacketid(packetId)
                .setStatus(status)
                .setRoomId(payload["roomId"])
                .build()
        };
    }

    private parseJoinChatResponse(type: PacketType, packetId: string, status: Statuses, payload: any): IResult<Packet> {
        if(!payload["members"]) {
            return {
                isError: "Invalid packet"
            };
        }

        const membersMap = new Map<string, string>;

        for(let memberId in payload["members"]) {
            membersMap.set(memberId, payload["members"][memberId]);
        }

        return {
            result: new ResponsePacketBuilder.JoinChatResponse.Builder()
                .setType(type)
                .setPacketid(packetId)
                .setStatus(status)
                .setMembers(membersMap)
                .build()
        };
    }

    private parseNewRoomMemberResponse(type: PacketType, packetId: string, status: Statuses, payload: any): IResult<Packet> {
        if(!payload["member"]) {
            return {
                isError: "Invalid packet"
            };
        }

        const member: SingleMember = {
            socketId: payload["member"]["socketId"],
            nickName: payload["member"]["nickName"]
        };

        return { 
            result: new ResponsePacketBuilder.NewRoomMember.Builder()
                .setType(type)
                .setPacketid(packetId)
                .setStatus(status)
                .setMembers(member)
                .build()
        };
    }

    private parseNewTokenResponse(type: PacketType, packetId: string, status: Statuses, payload: any): IResult<Packet> {
        if(!payload["token"]) {
            return {
                isError: "Invalid packet"
            };
        }

        return {
            result: new ResponsePacketBuilder.NewToken.Builder()
                .setType(type)
                .setPacketid(packetId)
                .setStatus(status)
                .setToken({token: payload["token"]})
                .build()
        };
    }

    private parseChatMessageResponse(type: PacketType, packetId: string, status: Statuses): IResult<Packet> {
        return {
            result: new ResponsePacketBuilder.ChatMessage.Builder()
                .setType(type)
                .setPacketid(packetId)
                .setStatus(status)
                .build()
        };
    }
}

export default new Parser();