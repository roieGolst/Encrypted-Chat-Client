import { IEncrypter } from "./IEncrypter";
import { Message, Sign } from "../common/types";
import { KeyHolder } from "./KeyHoldler";
import { AsymetricEncrypter } from "../data/asymetric/common/RsaEncrypted";

export abstract class KeysPairHolder implements AsymetricEncrypter {
    protected readonly privateKey: IEncrypter;
    protected readonly publicKey: IEncrypter;

    constructor(privateKey: IEncrypter, publicKey: IEncrypter) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }
    abstract encryptPrivate(message: Message): string
    abstract decryptPublic(message: Message): string;
    abstract encrypt(message: Message): string;
    abstract decrypt(message: Message): string; 
    abstract sign(message: Message): string;
    abstract verify(message: Message, sign: Sign): boolean;
};