import { IResult } from "../../../common/IResult";
import NetworkLayer from "../../../common/network";
import { Statuses } from "../../../utils/encryptedChatProtocol/commonTypes";
import { LoginRequest } from "../../../utils/encryptedChatProtocol/requestPackets";
import LoginRequestPacket from "../../../utils/encryptedChatProtocol/requestPackets/Login";
import { LoginResponse } from "../../../utils/encryptedChatProtocol/responsePackets";
import ResponsePacket from "../../../utils/encryptedChatProtocol/responsePackets/ResponsePacket";

import { LoginViewInput } from "../LoginView";
import { LoginResponseModel } from "./models/LoginResultModel";

export default class LoginModel {
    async sendLoginPacket(userAttributs: LoginViewInput): Promise<IResult<LoginResponseModel>> {

        if(!userAttributs.username || !userAttributs.password) {
            throw Error("Something worng");
        }

        const packet = new LoginRequest.Builder()
            .setAuthAttributs(userAttributs.username, userAttributs.password)
            .build();
        
        let responsePacket: ResponsePacket;
        try {
            responsePacket = await NetworkLayer.waitForResponse(packet);
        }
        catch(err) {
            return {
                isSuccess: false,
                error: "Request faild"
            };
        }

        if(! (responsePacket instanceof LoginResponse)) {
            return {
                isSuccess: false,
                error: "Invalid response packet"
            };
        }

        else if(responsePacket.status == Statuses.Failed) {
            return {
                isSuccess: false,
                error: "Request faild"
            };
        }

        return {
            isSuccess: true,
            value: {
                tokens: responsePacket.tokens
            }
        };
    }
}