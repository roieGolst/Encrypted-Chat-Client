import NetworkLayer from "../../common/network";
import { AuthAttributs, Status, UserDetails, Tokens } from "../../encryptedChatProtocol/common/commonTypes";
import { LoginRequest } from "../../encryptedChatProtocol/requestPackets";
import { LoginResponse } from "../../encryptedChatProtocol/responsePackets";
import { IAuthRepository } from "./IAuthRepository";

class AuthRepository implements IAuthRepository {
    private userDetails: UserDetails;

    async login(userAuthAttributs: AuthAttributs): Promise<boolean> {
        const packet = new LoginRequest.Builder()
            .setAuthAttributs(userAuthAttributs.username, userAuthAttributs.password)
            .build();
        
        try {
            const responsePacket: LoginResponse = await NetworkLayer.waitForResponse(packet);
            
            if(responsePacket.status != Status.Succeeded) {
                return false;
            }

            this.userDetails = responsePacket.userDetails;
    
            return true;
        }
        catch(err) {
            return false;
        }
    }

    isLoggedIn(): boolean {
        return this.userDetails != undefined;
    }
    
    getUserId(): string | undefined {
        if(!this.userDetails) {
            return undefined;
        }

        return this.userDetails.userId;
    }
    
    getUserTokens(): Tokens | undefined {
        if(!this.userDetails) {
            return undefined;
        }

        return this.userDetails.tokens;
    }
    
}

export default new AuthRepository();