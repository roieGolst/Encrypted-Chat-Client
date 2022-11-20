import { IResult } from "../../../common/IResult";
import { PacketType, Statuses } from "../../../utils/encryptedChatProtocol/commonTypes";
import { chatMessaegResponsePacketSchema } from "./schemas";

type ChatMessageResponsePacket = {
    packetId: string;
    type: PacketType.ChatMessage;
    status: Statuses;
}

export default {
    validate: (data: any): IResult<ChatMessageResponsePacket> => {
        const result = chatMessaegResponsePacketSchema.validate(data);

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
                type: PacketType.ChatMessage,
                status: data.status
            }
        };
    }
};