import { Message } from "../../../common/types";
import { IEncrypter } from "../../../domain/IEncrypter";

export interface AsymetricEncrypter extends IEncrypter {
    encryptPrivate(message: Message): string;
    decryptPublic(message: Message): string
}