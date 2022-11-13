import NetworkLayer from "../../common/network";
import { LoginRequest } from "../../utils/encryptedChatProtocol/requestPackets";

import { LoginViewInput } from "./LoginView";

export default class LoginModel {
    sendLoginPacket(userAttributs: LoginViewInput): void {

        if(!userAttributs.username || !userAttributs.password) {
            throw Error("Something worng");
        }

        const packet = new LoginRequest.Builder()
            .setAuthAttributs(userAttributs.username, userAttributs.password)
            .build()
            
        NetworkLayer.sendMessage(packet.toString());
    }
}