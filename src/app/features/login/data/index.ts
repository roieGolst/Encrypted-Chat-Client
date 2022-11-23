import { x } from "joi";
import { IResult } from "../../../common/IResult";
import NetworkLayer from "../../../common/network";
import { Status } from "../../../utils/encryptedChatProtocol/commonTypes";
import { LoginRequest } from "../../../utils/encryptedChatProtocol/requestPackets";
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
            .build();
            
        try {
            const responsePacket = await NetworkLayer.waitForResponse(packet) as LoginResponse;

            console.log(responsePacket);

            if(responsePacket.status != Status.Succeeded) {
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
        catch(err) {
            return {
                isSuccess: false,
                error: "Request failed"
            };
        }

        
    }
}