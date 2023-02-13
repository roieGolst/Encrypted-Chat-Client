import NodeRSA from "node-rsa";
import { Message } from "../../common/types";
import { IEncrypter } from "../../domain/IEncrypter";
import { IEncryptionDataSource } from "../IEncryptionDataSource";
import { AsymetricKeyInstance } from "./common/AsymetricEncriptionConfig";


 class RsaKeyHolder implements IEncrypter {
    private readonly rsaInstance: NodeRSA;

    constructor(rsaKeys: AsymetricKeyInstance) {
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
        return this.rsaInstance.sign(message.content, "base64");
    }
    verify(message: Message, sign: string): boolean {
        return this.rsaInstance.verify(message.content, Buffer.from(sign));
    }
}


export class RsaDataSource implements IEncryptionDataSource<AsymetricKeyInstance> {
    factory(rsaConfig: AsymetricKeyInstance): IEncrypter {
        return new RsaKeyHolder(rsaConfig);
    }

}