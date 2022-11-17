import Joi from "joi";
import userConfigs from "../../../../config/userConfigs.json";
import userAttributsSchema from "../../schemas/userAttributsSchema";
import tokenConfigs from "../../../../config/tokenConfigs.json";

export default Joi.object({
    packetId: Joi.string()
        .min(userConfigs.UUID_LENGTH)
        .max(userConfigs.UUID_LENGTH)
        .required(),

    type: Joi.string()
        .valid("login")
        .required(),

    status: Joi.string()
        .valid("succeeded", "failed")
        .required(),
        
    userAttributs: userAttributsSchema
        .optional(),

    tokens: Joi.object({
        token: Joi.string()
            .min(tokenConfigs.MIN_TOKEN_LENGTH)
            .required(),

        refreshToken: Joi.string()
            .required()
        })
        .optional()
    
});