import NodeRSA from "node-rsa";
import { Message } from "../../common/types";
import { IEncrypter } from "../../domain/IEncrypter";

type Key = string | Buffer;
type Format = NodeRSA.Format;

export class RsaKeyHolder implements IEncrypter {
    private readonly key: NodeRSA;

    constructor(size: number = 2048, key?: string | Buffer, format?: Format) {
        if(key) {
            this.importKey(key, format);
        }

        this.key = new NodeRSA();
    }

    private importKey(key: Key, format?: Format): void {
        try {
            this.key.importKey(key, format);
        }
        catch(err) {
            throw new Error(`${err}`);
        }
    }

    encrypt(message: Message): string {
        const encryptedData = this.key.encrypt(message.content, "base64");

        return encryptedData
    }

    decrypt(message: Message): string {
        throw new Error("Method not implemented.");
    }
    sign(message: Message): string {
        throw new Error("Method not implemented.");
    }
    verify(message: Message, sign: string): boolean {
        throw new Error("Method not implemented.");
    }
}