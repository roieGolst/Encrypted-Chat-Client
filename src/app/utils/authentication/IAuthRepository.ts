import { AuthAttributs, Tokens } from "../../encryptedChatProtocol/common/commonTypes"

export interface IAuthRepository {
    login(userAuthAttributs: AuthAttributs): Promise<boolean>;
    getUserId(): string | undefined;
    getUserTokens(): Tokens | undefined;
}