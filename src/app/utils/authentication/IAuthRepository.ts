import { AuthAttributs, Tokens } from "../encryptedChatProtocol/commonTypes"

export interface IAuthRepository {
    login(userAuthAttributs: AuthAttributs): Promise<boolean>;
    getUserId(): string | undefined;
    getUserTokens(): Tokens | undefined;
}