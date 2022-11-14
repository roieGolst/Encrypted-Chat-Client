import { IResult } from "../../../common/IResult";
import NetworkLayer from "../../../common/network";
import { LoginRequest } from "../../../utils/encryptedChatProtocol/requestPackets";
import LoginRequestPacket from "../../../utils/encryptedChatProtocol/requestPackets/Login";
import { LoginResponse } from "../../../utils/encryptedChatProtocol/responsePackets";

import { LoginViewInput } from "../LoginView";
import { LoginResponseModel } from "./models/LoginResultModel";

export default class LoginModel {
    async sendLoginPacket(userAttributs: LoginViewInput): Promise<IResult<LoginResponseModel>> {

        if(!userAttributs.username || !userAttributs.password) {
            throw Error("Something worng");
        }

        const packet = new LoginRequest.Builder()
            .setAuthAttributs(userAttributs.username, userAttributs.password)
            .build()
            
        const responsePacket = await NetworkLayer.waitForResponse(packet);

        if(! (responsePacket instanceof LoginResponse)) {
            return {
                isSuccess: false,
                error: "Invalid response packet"
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