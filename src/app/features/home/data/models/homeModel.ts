import { RoomUser } from "../../../../encryptedChatProtocol/roomNotifications/RoomUser"

export type CreateChatResultModel = {
    readonly roomId: string
}

export type JoinChatResultModel = {
    readonly membres?: RoomUser[]
}