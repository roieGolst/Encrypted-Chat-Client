import { IResult } from "../../../common/IResult";
import { PacketType, Status } from "../../../utils/encryptedChatProtocol/commonTypes";
import { pollingSchema } from "./schemas";

type PollingResponsePacket = {
    readonly packetId: string;
    readonly type: PacketType.CreateChat;
    readonly status: Status;
    readonly body?: string[];
}

export default {
    validate: (data: any): IResult<PollingResponsePacket> => {
        const result = pollingSchema.validate(data);

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
                type: PacketType.CreateChat,
                status: data.status,
                body: data.body
            }
        };
    }
};