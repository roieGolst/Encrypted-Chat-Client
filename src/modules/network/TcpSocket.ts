import net from "net";
import { IDateHandler } from "./IDataHandlet";

export class TcpSocket {
    private readonly socket: net.Socket;

    constructor(socket: net.Socket) {
        this.socket = socket;
    }

    init(handler: IDateHandler) {
        this.socket.on("error", (err) => {
            handler.handleOnError(err);
        });

        this.socket.on("data", (data) => {
            handler.handleOnData(data);
        });

        this.socket.on("close", (hadError) => {
            handler.handleOnClose(hadError);
        });
    }

    connect(host: string, port: number): Promise<boolean> {
        //error handling;
        return new Promise((resolve, reject) => {
            this.socket.connect(port, host, () => {
                resolve(true);
            });
        })
    }

    send(content: string): void {
        this.socket.write(content);
    }

    closeConnection() {
        this.socket.destroy();
    }
}