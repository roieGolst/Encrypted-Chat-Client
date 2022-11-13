import NetworkLayer from "../../common/network";
import LoginPacket from "../../utils/encryptedChatProtocol/requestPackets/Login";
import { LoginViewInput } from "./LoginView";

export default class LoginModel {
    sendLoginPacket(userAttributs: LoginViewInput): void {
        if(!userAttributs.username) {
            return;
        }

        else if(!userAttributs.password) {
            return;
        }

        const packetId = "1as5664zx74A56a1sd2"

        const packet = new LoginPacket.Builder()
            .setPacketId(packetId)
            .setAuthAttributs(userAttributs.username, userAttributs.password)
            .build();
            
        NetworkLayer.sendMessage(packet.toString());
    }
}