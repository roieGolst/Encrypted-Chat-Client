import { IResult } from "../../../common/IResult";
import { PackTypes, Statuses } from "../commonTypes";
import ResponsePacket from "../ResponsePacket";
import * as ResponsePacketBuilder from "./responsePacketBuilder";

class Parser {

    private dataToJson(data: string): IResult<ResponsePacket> {
        try {
            return {
                result: JSON.parse(data)
            };
        }
        catch(err) {
            return {
                isError: `${err}`
            }
        }
    }

    parse(data: Buffer): IResult<ResponsePacket> {
        const stringData = data.toString("utf-8");

        console.log(stringData);
        
        const { result, isError } = this.dataToJson(stringData);

        if(!result) {
            return {
                isError
            };
        }

        if(!result.type) {
            return {
                isError: "Invalid packet"
            }
        }

        switch(result.type) {
            case PackTypes.Login: {
                //WIP Export to function
                const packet = result as ResponsePacketBuilder.LoginResponse
                if(packet.status !== Statuses.Succeeded) {
                    return {
                        result: {
                            packetId: packet.packetId,
                            type: PackTypes.Login,
                            status: Statuses.Failed,
                            error: packet.error
                        }
                    };
                }

                if(!packet.userAttributs || !packet.tokens) {
                    return {
                        isError: "Invalid packet"
                    };
                }

                return {
                    result: ResponsePacketBuilder.LoginResponse.Builder
                        .setPacketid(packet.packetId)
                        .setStatus(Statuses.Succeeded)
                        .setType(PackTypes.Login)
                        .setUserAttributs(packet.userAttributs)
                        .setTokens(packet.tokens)
                        .build()
                };
            }

            case PackTypes.Register: {
                //WIP Export to function
                if(result.status !== Statuses.Succeeded) {
                    return {
                        result: {
                            packetId: result.packetId,
                            type: PackTypes.Register,
                            status: Statuses.Failed,
                            error: result.error
                        }
                    };
                }

                return {
                    result: ResponsePacketBuilder.RegisterResponse.Builder
                        .setPacketid(result.packetId)
                        .setStatus(Statuses.Succeeded)
                        .setType(PackTypes.Login)
                        .build()
                };
            }

            default : {
                //WIP !!
                return { 
                    isError: "balblalba"
                };
            }
        }
    }
}

export default new Parser();