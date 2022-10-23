import NetworkLayer from "../common/NetworkLayer";

export default class LoginModel {
    sendLoginPacket(packet: string): void {
        NetworkLayer.sendMessage(packet);
    }
}