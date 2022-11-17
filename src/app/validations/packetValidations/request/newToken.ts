import Joi from "joi";
import { IResult } from "../../../common/IResult";
import { PacketType } from "../../../utils/encryptedChatProtocol/commonTypes";
import userConfigs from "../../../config/userConfigs.json";

const MIN_TOKEN_LENGTH = 10;

type newTokenRequestPacket = {
    packetId: string;
    type: PacketType.NewToken;
    refreshToken: string;
}

const joinChatPacketSchema = Joi.object({
    packetId: Joi.string()
        .min(userConfigs.UUID_LENGTH)
        .max(userConfigs.UUID_LENGTH)
        .required(),

    type: Joi.string()
        .valid("newToken")
        .required(),
        
    refreshToken: Joi.string()
        .min(MIN_TOKEN_LENGTH)
        .required(),
        
});

export default {
    validate: (data: any): IResult<newTokenRequestPacket> => {
        const result = joinChatPacketSchema.validate(data);

        if(result.error) {
            return {
                isSuccess: false,
                error: result.error?.details[0].message || "Vlidation error"
            };
        }

        return {
            isSuccess: true,
            value: {
                packetId: data.packetId,
                type: PacketType.NewToken,
                refreshToken: data.refreshToken
            }
        };
    }
};