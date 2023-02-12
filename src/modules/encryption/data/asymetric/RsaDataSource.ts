import { DEFAULT_INPUT_ENCODING, Message } from "../../common/types";
import { KeyHolder } from "../../domain/KeyHoldler";
import { KeysPairHolder } from "../../domain/KeysPairHolder";
import NodeRsa from "node-rsa";
import { IEncrypter } from "../../domain/IEncrypter";
import { IEncryptionDataSource } from "../IEncryptionDataSource";
import { AsymetricEncriptionConfig } from "./common/AsymetricEncriptionConfig";
import { AsymetricEncrypter } from "./common/RsaEncrypted";
import { RsaKeyHolder } from "./RsaKeyHolder";



class RsaKeysPairHolder implements IEncrypter {
    protected readonly privateKey?: RsaKeyHolder;
    protected readonly publicKey?: RsaKeyHolder;

    constructor(config?: AsymetricEncriptionConfig) {
        this.privateKey = config?.privateKey;
        this.publicKey = config?.publicKey
    }

    encrypt(message: Message): string {
        if(!this.publicKey) {
            throw new Error("Information cannot be encrypted without a key");
        }
        return this.publicKey.encrypt(message);
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

export class RsaDataSource implements IEncryptionDataSource<AsymetricEncriptionConfig> {
    factory(config: AsymetricEncriptionConfig): IEncrypter {
        return new RsaKeysPairHolder(config);
    }

}