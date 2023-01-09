import { IEncrypter } from "../domain/IEncrypter";

export interface IEncryptionDataSource {
    factory(): IEncrypter;
}