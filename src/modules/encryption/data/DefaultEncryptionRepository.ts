import { IEncrypter } from "../domain/IEncrypter";
import { IEncryptionRepository } from "../domain/IEncryptionRepository";
import { IEncryptionDataSource } from "./IEncryptionDataSource";

export class DefaultEncryptionRepository implements IEncryptionRepository {
    private readonly symetericDataSource: IEncryptionDataSource;
    private readonly asynetericDataSource: IEncryptionDataSource;

    constructor(symetericDataSource: IEncryptionDataSource, asynetericDataSource: IEncryptionDataSource) {
        this.symetericDataSource = symetericDataSource;
        this.asynetericDataSource = asynetericDataSource;
    }

    getKeysPair(): IEncrypter {
        return this.asynetericDataSource.factory();
    }

    getKey(): IEncrypter {
        return this.symetericDataSource.factory();
    }
}