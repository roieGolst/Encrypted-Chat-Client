import { Message, Sign } from "../common/types";


export interface IEncrypter {
    encrypt(message: Message): string;
    decrypt(message: Message): string;
    sign(message: Message): string;
    verify(message: Message, sign: Sign): boolean;
};