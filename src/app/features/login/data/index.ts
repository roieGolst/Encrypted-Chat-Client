import AuthRepository from "../../../utils/authentication/AuthRepository";
import { LoginViewInput } from "../LoginView";


export default class LoginModel {
    async sendLoginPacket(userAttributs: LoginViewInput): Promise<boolean> {
        return AuthRepository.login(userAttributs);
    }
}