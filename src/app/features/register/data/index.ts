import { IResult } from "../../../common/IResult";
import NetworkLayer from "../../../common/network";
import { Statuses } from "../../../utils/encryptedChatProtocol/commonTypes";
import { RegisterRequest } from "../../../utils/encryptedChatProtocol/requestPackets";
import { RegisterResponse } from "../../../utils/encryptedChatProtocol/responsePackets";
import ResponsePacket from "../../../utils/encryptedChatProtocol/responsePackets/ResponsePacket";
import { RegisterViewInput } from "../RegisterView";

export default class RegisterModel {
    async sendRegisterPacket(userAttributs: RegisterViewInput): Promise<boolean> {

        if(!userAttributs.username || !userAttributs.password) {
            throw Error("Something worng");
        }

        const packet = new RegisterRequest.Builder()
            .setAuthAttributs(userAttributs.username,userAttributs.password)
            .build()
            
        let responsePacket: ResponsePacket;
        try {
            responsePacket = await NetworkLayer.waitForResponse(packet);
        }
        catch(err) {
            return false
        }

        if(! (responsePacket instanceof RegisterResponse)) {
            return false
        }

        else if(responsePacket.status == Statuses.Failed) {
            return false
        }

        return true;
    }
}