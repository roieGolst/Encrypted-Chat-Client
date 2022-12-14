import { IResult } from "../../../common/IResult";
import { PacketType } from "../../../utils/encryptedChatProtocol/commonTypes";
import { joinChatRequestPacketSchema } from "./schemas";

type JoinChatRequestPacket = {
    readonly packetId: string;
    readonly type: PacketType.JoinChat;
    readonly token: string;
    readonly roomId: string;
}

export default {
    validate: (data: any): IResult<JoinChatRequestPacket> => {
        const result = joinChatRequestPacketSchema.validate(data);

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
                type: PacketType.JoinChat,
                token: data.token,
                roomId: data.roomId
            }
        };
    }
};