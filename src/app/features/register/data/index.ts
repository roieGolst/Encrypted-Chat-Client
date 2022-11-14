import { IResult } from "../../../common/IResult";
import NetworkLayer from "../../../common/network";
import { RegisterRequest } from "../../../utils/encryptedChatProtocol/requestPackets";
import { RegisterResponse } from "../../../utils/encryptedChatProtocol/responsePackets";
import { RegisterViewInput } from "../RegisterView";

export default class RegisterModel {
    async sendRegisterPacket(userAttributs: RegisterViewInput): Promise<boolean> {

        if(!userAttributs.username || !userAttributs.password) {
            throw Error("Something worng");
        }

        const packet = new RegisterRequest.Builder()
            .setAuthAttributs(userAttributs.username,userAttributs.password)
            .build()
            
        const responsePacket = await NetworkLayer.waitForResponse(packet);

        if(! (responsePacket instanceof RegisterResponse)) {
            return false
        }

        return true;
    }
}