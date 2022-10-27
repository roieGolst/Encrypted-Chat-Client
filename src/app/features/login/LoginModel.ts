import NetworkLayer from "../../common/network";
import LoginPacket from "../../utils/packets/requestPacketBuilder/LoginRequest";
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

        const packet = LoginPacket.Builder
            .setPacketId(packetId)
            .setUsername(userAttributs.username)
            .setPassword(userAttributs.password)
            .build();
            
        NetworkLayer.sendMessage(packet.toString());
    }
}