import NetworkLayer from "../../../common/network";
import { Statuses } from "../../../utils/encryptedChatProtocol/commonTypes";
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
            
        try {
            const responsePacket = await NetworkLayer.waitForResponse(packet) as RegisterResponse;

            if(responsePacket.status == Statuses.Failed) {
                return false;
            }

            return true;
        }
        catch(err) {
            return false;
        }
    }
}