export type CreateChatResultModel = {
    readonly roomId: string
}

export type JoinChatResultModel = {
    readonly membres?: Map<string, string>
}