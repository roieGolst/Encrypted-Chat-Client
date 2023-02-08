import { IEncrypter } from "./IEncrypter";
import { Message, Sign } from "../common/types";

export abstract class KeyHolder implements IEncrypter {
    protected readonly key: Buffer;
    protected readonly iv: Buffer;

    constructor(key: Buffer, initialVector: Buffer) {
        this.key = key;
        this.iv = initialVector;
    }

    abstract encrypt(message: Message): string;
    abstract decrypt(message: Message): string; 
    abstract sign(message: Message): string;
    abstract verify(message: Message, sign: Sign): boolean;
}