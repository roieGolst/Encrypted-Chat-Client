import { IEncrypter } from "../../domain/IEncrypter";
import { KeyHolder } from "../../domain/KeyHoldler";
import { IEncryptionDataSource } from "../IEncryptionDataSource";


class AesKeyHolder extends KeyHolder {

    constructor() {
        const key = "any AES key" //crypto.getRandomBytes(""); 
        super(key);
    }

    encrypt(message: string) {
        throw new Error("Method not implemented.");
    }

    decrypt(message: string) {
        throw new Error("Method not implemented.");
    }

    sign(message: string) {
        throw new Error("Method not implemented.");
    }

    verify(message: string, sign: string): boolean {
        throw new Error("Method not implemented.");
    }

}

export class AesDataSource implements IEncryptionDataSource {
    factory(): IEncrypter {
        return new AesKeyHolder()
    }
    
}