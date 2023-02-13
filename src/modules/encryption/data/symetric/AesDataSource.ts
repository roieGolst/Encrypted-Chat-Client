import { IEncrypter } from "../../domain/IEncrypter";
import { IEncryptionDataSource } from "../IEncryptionDataSource";
import * as crypto from "crypto";
import { Message, Sign } from "../../common/types";
import { SymetricConfig } from "./common/SymetricEncryptionConfig";

const ALGORITHM = "aes-128-cbc";
const DEFAULT_INPUT_ENCODING = "utf-8";
const DEFAULT_OUTPUT_ENCODING = "base64";
 
class AesKeyHolder {
    protected readonly key: Buffer;
    protected readonly iv: Buffer;

    constructor(key: Buffer, initialVector: Buffer) {
        this.key = key;
        this.iv = initialVector;
    }

    encrypt(message: Message): string {
        //TODO: considering adding of a final method.
        const cipher: crypto.Cipher = crypto.createCipheriv(ALGORITHM, this.key, this.iv);

        let encryptedData = cipher.update(
            message.content,
            message.inputEncoding || DEFAULT_INPUT_ENCODING, 
            message.outputEncoding || DEFAULT_OUTPUT_ENCODING
        );

        encryptedData += cipher.final(message.outputEncoding || DEFAULT_OUTPUT_ENCODING);

        return encryptedData;
    }

    decrypt(message: Message): string {
        const decipher = crypto.createDecipheriv(ALGORITHM, this.key, this.iv);

        let decryptedData = decipher.update(
            message.content,
            message.inputEncoding || DEFAULT_OUTPUT_ENCODING, 
            message.outputEncoding || DEFAULT_INPUT_ENCODING
        );

        decryptedData += decipher.final(message.outputEncoding || DEFAULT_INPUT_ENCODING);

        return decryptedData;
    }

    sign(message: Message): string {
        throw new Error("Method not implemented.");
    }

    verify(message: Message, sign: Sign): boolean {
        throw new Error("Method not implemented.");
    }

}

export class AesDataSource implements IEncryptionDataSource<SymetricConfig> {
    factory(config: SymetricConfig): IEncrypter {
        return new AesKeyHolder(config.key, config.iv);
    }
    
}