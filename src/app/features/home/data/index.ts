import { IResult } from "../../../common/IResult";
import NetworkLayer from "../../../common/network";
import { Status, Tokens } from "../../../utils/encryptedChatProtocol/commonTypes";
import { CreateChatRequest, JoinChatRequest } from "../../../utils/encryptedChatProtocol/requestPackets";
import { CreateChatResponse } from "../../../utils/encryptedChatProtocol/responsePackets";
import JoinChatPacket from "../../../utils/encryptedChatProtocol/responsePackets/JoinChat";
import { CreateChatResultModel, JoinChatResultModel } from "./models/homeModel";

export default class HomeModel {
    async sendCreateChatPacket(tokens: Tokens): Promise<IResult<CreateChatResultModel>> {
        const packet = new CreateChatRequest.Builder()
            .setToken(tokens.token)
            .build();

        try {
            const responsePacket: CreateChatResponse = await NetworkLayer.waitForResponse(packet);

            if(responsePacket.status != Status.Succeeded) {
                return {
                    isSuccess: false,
                    error: "Request failed"
                };
            }

            return {
                isSuccess: true,
                value: {
                    roomId: responsePacket.roomId
                }
            };
        }
        catch(err) {
            return {
                isSuccess: false,
                error: "Time out"
            };
        }
    }

    async sendJoinChatPacket(roomId: string, tokens: Tokens): Promise<IResult<JoinChatResultModel>> {
        const packet = new JoinChatRequest.Builder()
            .setRoomId(roomId)
            .setToken(tokens.token)
            .build();

        try {
            const responsePacket: JoinChatPacket = await NetworkLayer.waitForResponse(packet);

            if(responsePacket.status != Status.Succeeded) {
                return {
                    isSuccess: false,
                    error: "Request failed"
                };
            }

            return {
                isSuccess: true,
                value: {
                    membres: responsePacket.members
                }
            };
        }
        catch(err) {
            return {
                isSuccess: false,
                error: "Time out"
            };
        }
    }
}