import NetworkLayer, { INetworkLayer } from "../../../modules/network";
import { IDateHandler } from "../../../modules/network/IDataHandlet";
import Packet from "../../utils/encryptedChatProtocol/Packet";
import Parser, { ParserErrorResult } from "../../utils/encryptedChatProtocol/parser";
import RequestPacket from "../../utils/encryptedChatProtocol/requestPackets/RequsetPacket";
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

    async waitForResponse<T extends ResponsePacket>(packet: RequestPacket): Promise<T> {
        const responsePromise: Promise<T> = new Promise((resolve, reject) => {
            this.responsePacketObserver.set(packet.packetId, (responsePacket: ResponsePacket) => {
                resolve(responsePacket as T);
            });

            setTimeout(() => {
                if(!this.responsePacketObserver.has(packet.packetId)) {
                    return;
                }
                this.responsePacketObserver.delete(packet.packetId);

                reject();
            }, 100000/*TODO: extract to external config*/);
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
        let parserResult: Packet;
        try{
            parserResult = Parser.parse(data);
        }
        catch(err: unknown) {
            if(err instanceof ParserErrorResult) {
                const packetId = err.packetId;

                if(!packetId) {
                    return;
                }

                const responsebserver = this.responsePacketObserver.get(packetId);

                if(!responsebserver) {
                    return;
                }

                responsebserver(new GeneralFailure(err.status, err.type, packetId));
            }

            return;
        }

        if(! (parserResult instanceof ResponsePacket)) {
            return;
        }

        const packetId = parserResult.packetId;
        const responsebserver = this.responsePacketObserver.get(packetId);

        if(!responsebserver) {
            return;
        }

        this.responsePacketObserver.delete(packetId);

        responsebserver(parserResult);
    }
    handleOnError(error: Error): void {
        throw new Error("Method not implemented.");
    }
    handleOnClose(hadError: boolean): void {
        throw new Error("Method not implemented.");
    }
}