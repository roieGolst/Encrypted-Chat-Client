import NodeRSA from "node-rsa";
import { Message } from "../../common/types";
import { IEncrypter } from "../../domain/IEncrypter";
import { AsymetricEncriptionConfig } from "./common/AsymetricEncriptionConfig";

type Key = string | Buffer;
type Format = NodeRSA.Format;

type Keys = {
    publicKey?: Key,
    privateKey?: Key
}

export class RsaKeyHolder implements IEncrypter {
    private readonly rsaInstance: NodeRSA;

    constructor(rsaKeys: NodeRSA) {
        this.rsaInstance = rsaKeys;
    }

    encrypt(message: Message): string {
        const encryptedData = this.rsaInstance.encrypt(message.content, "base64");

        return encryptedData
    }

    decrypt(message: Message): string {
        return this.rsaInstance.decrypt(message.content, "utf8");
    }
    sign(message: Message): string {
        throw new Error("Method not implemented.");
    }
    verify(message: Message, sign: string): boolean {
        throw new Error("Method not implemented.");
    }
}