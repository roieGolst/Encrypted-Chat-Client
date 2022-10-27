import { IResult } from "../../../../common/IResult";
import { PackTypes, Statuses } from "../../commonTypes";
import ResponsePacket from "../ResponsePacket";
import * as ResponsePacketBuilder from "..";
import LoginResponsePacket from "../LoginResponse";
import RegisterResponsePacket from "../RegisterResponse";
import CreateChatResponsePacket from "../CreateChatResponse";

class Parser {

    private dataToPacket(data: string): IResult<ResponsePacket> {
        try {
            let packet = JSON.parse(data);

            if(!packet.type || !packet.status || !packet.packetId) {
                return {
                    isError: "Invalid packet"
                }
            }

            return {
                result: packet
            };
        }
        catch(err) {
            return {
                isError: `${err}`
            }
        }
    }

    parse(data: Buffer): IResult<ResponsePacket> {
        const stringData = data.toString("utf-8");
        
        const { result, isError } = this.dataToPacket(stringData);

        if(!result) {
            return {
                isError
            };
        }

        if(! (result instanceof ResponsePacket)) {
            return {
                isError: "Invalid packet"
            };
        }

        switch(result.type) {
            case PackTypes.Login: {
                return this.parseLoginResponse(result);
            };

            case PackTypes.Register: {
                return this.parseRegisterResponse(result);
            };

            case PackTypes.CreateChat: {
                return this.parseCreateChatResponse(result);
            };

            default : {
                return { 
                    isError: "Something worng packet type is invalid"
                };
            }
        }
    }

    private parseLoginResponse(packet: ResponsePacket): IResult<ResponsePacketBuilder.LoginResponse> {
        if(! (packet instanceof LoginResponsePacket)) {
            return {
                isError: "Invalid packet"
            };
        }

        if(packet.status !== Statuses.Succeeded) {
            return {
                result: new ResponsePacketBuilder.LoginResponse.Builder()
                .setPacketid(packet.packetId)
                .setType(PackTypes.Login)
                .setStatus(Statuses.Succeeded)
                .build()
            };
        }

        return {
            result: new ResponsePacketBuilder.LoginResponse.Builder()
                .setPacketid(packet.packetId)
                .setType(PackTypes.Login)
                .setStatus(Statuses.Succeeded)
                .setUserAttributs(packet.userAttributs)
                .setTokens(packet.tokens)
                .build()
        } ;
    }

    private parseRegisterResponse(packet: ResponsePacket): IResult<ResponsePacketBuilder.RegisterResponse> {
        if(! (packet instanceof RegisterResponsePacket)) {
            return {
                isError: "Invalid packet"
            };
        }

        if(packet.status !== Statuses.Succeeded) {
            return {
                result: new ResponsePacketBuilder.RegisterResponse.Builder()
                .setPacketid(packet.packetId)
                .setType(PackTypes.Register)
                .setStatus(Statuses.Succeeded)
                .build()
            };
        }

        return {
            result: new ResponsePacketBuilder.RegisterResponse.Builder()
                .setPacketid(packet.packetId)
                .setType(PackTypes.Register)
                .setStatus(Statuses.Succeeded)
                .build()
        };
    }

    private parseCreateChatResponse(packet: ResponsePacket): IResult<ResponsePacketBuilder.CreateChatResponse> {
        if(! (packet instanceof CreateChatResponsePacket)) {
            return {
                isError: "Invalid packet"
            };
        }

        if(packet.status !== Statuses.Succeeded) {
            return {
                result: new ResponsePacketBuilder.CreateChatResponse.Builder()
                .setPacketid(packet.packetId)
                .setType(PackTypes.CreateChat)
                .setStatus(Statuses.Succeeded)
                .build()
            };
        }

        return {
            result: new ResponsePacketBuilder.CreateChatResponse.Builder()
                .setPacketid(packet.packetId)
                .setType(PackTypes.CreateChat)
                .setStatus(Statuses.Succeeded)
                .setRoomId(packet.roomId)
                .build()
        };
    }
}

export default new Parser();