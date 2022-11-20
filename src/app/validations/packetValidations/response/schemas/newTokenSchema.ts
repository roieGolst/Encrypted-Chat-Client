import Joi from "joi";
import userConfigs from "../../../../config/userConfigs.json";
import tokenConfigs from "../../../../config/tokenConfigs.json";

export default Joi.object({
    packetId: Joi.string()
        .min(userConfigs.UUID_LENGTH)
        .max(userConfigs.UUID_LENGTH)
        .required(),

    type: Joi.string()
        .valid("newToken")
        .required(),

    status: Joi.string()
        .valid("succeeded", "failed")
        .required(),
        
    token: Joi.string()
        .min(tokenConfigs.MIN_TOKEN_LENGTH)
        .optional(),     
});