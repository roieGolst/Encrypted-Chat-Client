import socketInitializer from "./socketInitializer";
import { TcpSocket } from "./TcpSocket";
import { IDateHandler } from "./IDataHandlet";

export interface INetworkLayer {
    start(args: NetWorkArgs): void;
    sendMessage(content: string): void;
    close(): void;
};

export type NetWorkArgs = {
    port: number,
    host: string,
    dataHandler: IDateHandler
};

export default class NetworkLayer implements INetworkLayer {
    private readonly tcpSocket: TcpSocket = new TcpSocket(socketInitializer());
    private readonly args: NetWorkArgs;

    constructor(args: NetWorkArgs) {
        this.args = args;
    }

    async start(): Promise<boolean> {
        this.tcpSocket.init(this.args.dataHandler);
        return await this.tcpSocket.connect(this.args.host, this.args.port);
    }

    sendMessage(content: string): void {
        this.tcpSocket.send(content);
    }

    close(): void {
        this.tcpSocket.closeConnection();
    }
};