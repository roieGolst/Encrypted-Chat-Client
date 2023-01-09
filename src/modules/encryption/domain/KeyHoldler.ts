import { IEncrypter } from "./IEncrypter";
import { Message, Sign } from "./IEncryptionRepository";

export abstract class KeyHolder implements IEncrypter {
    protected readonly key: TBD;

    constructor(key: TBD) {
        this.key = key;
    }

    abstract encrypt(message: Message): TBD;
    abstract decrypt(message: Message): TBD; 
    abstract sign(message: Message);
    abstract verify(message: Message, sign: Sign): boolean;
};