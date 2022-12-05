import NetworkLayer, { INetworkLayer } from "../../../modules/network";
import { IDateHandler } from "../../../modules/network/IDataHandlet";
import { PacketType } from "../../utils/encryptedChatProtocol/commonTypes";
import Packet from "../../utils/encryptedChatProtocol/Packet";
import Parser from "../../utils/encryptedChatProtocol/parser";
import { GeneralFailure } from "../../utils/encryptedChatProtocol/responsePackets";
import ResponsePacket from "../../utils/encryptedChatProtocol/responsePackets/ResponsePacket";

export type ResponsePacketObserver = (responsePacket: ResponsePacket) => void;

export default new class NetworkLayerProxy implements INetworkLayer, IDateHandler {
    private networkLayer: NetworkLayer = new NetworkLayer({
        port: 3000,
        host: "127.0.0.1",
        dataHandler: this
    });

    private readonly responsePacketObserver: Map<string, ResponsePacketObserver> = new Map();

    async start(): Promise<boolean> {
        return await this.networkLayer.start();
    }

    async waitForResponse(packet: Packet): Promise<ResponsePacket> {
        const responsePromise: Promise<ResponsePacket> = new Promise((resolve, reject) => {
            this.responsePacketObserver.set(packet.packetId, (responsePacket: ResponsePacket) => {
                resolve(responsePacket);
            });

            setTimeout(() => {
                if(!this.responsePacketObserver.has(packet.packetId)) {
                    return;
                }
                this.responsePacketObserver.delete(packet.packetId);

                reject();
            }, 100000);
        });

        this.sendMessage(packet.toString());

        return responsePromise;
    }

    sendMessage(content: string): void {
        this.networkLayer.sendMessage(content);
    }

    close(): void {
        this.networkLayer.close();
    }

    handleOnData(data: Buffer): void {
        const parserResult = Parser.parse(data);
        
        if(!parserResult.isSuccess) {
            const packetId = parserResult.error.packetId;

            if(!packetId) {
                return;
            }

            const responsebserver = this.responsePacketObserver.get(packetId);

            if(!responsebserver) {
                return;
            }

            const type = parserResult.error.type;

            if(!type) {
                responsebserver(new GeneralFailure.Builder()
                .setPacketId(packetId)
                .setType(PacketType.GeneralFailure)
                .setStatus(parserResult.error.statuse)
                .build()
                )
                return;
            }
            

            responsebserver(new GeneralFailure.Builder()
                .setPacketId(packetId)
                .setType(type)
                .setStatus(parserResult.error.statuse)
                .build()
            )
            return;
        }

        if(! (parserResult.value instanceof ResponsePacket)) {
            return;
        }

        const packetId = parserResult.value.packetId;
        const responsebserver = this.responsePacketObserver.get(packetId);

        if(!responsebserver) {
            return;
        }

        this.responsePacketObserver.delete(packetId);

        responsebserver(parserResult.value);
    }
    handleOnError(error: Error): void {
        throw new Error("Method not implemented.");
    }
    handleOnClose(hadError: boolean): void {
        throw new Error("Method not implemented.");
    }
}