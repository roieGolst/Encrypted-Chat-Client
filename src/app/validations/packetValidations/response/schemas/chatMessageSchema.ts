import Joi from "joi";
import userConfigs from "../../../../config/userConfigs.json";
import messageConfigs from "../../../../config/messageConfigs.json";

export default Joi.object({
    packetId: Joi.string()
        .min(userConfigs.UUID_LENGTH)
        .max(userConfigs.UUID_LENGTH)
        .required(),

    type: Joi.string()
        .valid("chatMessage")
        .required(),

    status: Joi.string()
        .valid(["succeeded", "failed"])
        .required()
});