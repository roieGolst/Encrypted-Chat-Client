import NetworkLayer from "../../../common/network";
import { Status } from "../../../utils/encryptedChatProtocol/commonTypes";
import { RegisterRequest } from "../../../utils/encryptedChatProtocol/requestPackets";
import { RegisterResponse } from "../../../utils/encryptedChatProtocol/responsePackets";
import { RegisterViewInput } from "../RegisterView";

export default class RegisterModel {
    async sendRegisterPacket(userAttributs: RegisterViewInput): Promise<boolean> {
        const packet = new RegisterRequest.Builder()
            .setAuthAttributs(userAttributs.username,userAttributs.password)
            .build()
            
        try {
            const responsePacket: RegisterResponse = await NetworkLayer.waitForResponse(packet);

            if(responsePacket.status != Status.Succeeded) {
                return false;
            }

            return true;
        }
        catch(err) {
            return false;
        }
    }
}