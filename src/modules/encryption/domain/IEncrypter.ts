import { Message, Sign } from "./IEncryptionRepository";

export interface IEncrypter {
    encrypt(message: Message): TBD;
    decrypt(message: Message): TBD;
    sign(message: Message): TBD;
    verify(message: Message, sign: Sign): boolean;
};