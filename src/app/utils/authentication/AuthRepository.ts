import NetworkLayer from "../../common/network";
import { AuthAttributs, Status, UserDetails } from "../encryptedChatProtocol/commonTypes";
import { LoginRequest } from "../encryptedChatProtocol/requestPackets";
import { LoginResponse } from "../encryptedChatProtocol/responsePackets";
import { IAuthRepository } from "./IAuthRepository";
import { Tokens } from "../encryptedChatProtocol/commonTypes";

class AuthRepository implements IAuthRepository {
    private userDetails: UserDetails;

    async login(userAuthAttributs: AuthAttributs): Promise<boolean> {
        const packet = new LoginRequest.Builder()
            .setAuthAttributs(userAuthAttributs.username, userAuthAttributs.password)
            .build();
        
        try {
            const responsePacket = await NetworkLayer.waitForResponse(packet) as LoginResponse;
            
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