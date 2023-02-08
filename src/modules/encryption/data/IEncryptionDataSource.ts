import { IEncrypter } from "../domain/IEncrypter";

export interface IEncryptionDataSource<T> {
    factory(config: T): IEncrypter;
}