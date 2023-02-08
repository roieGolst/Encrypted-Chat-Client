import { IEncrypter } from "../domain/IEncrypter";
import { IEncryptionRepository } from "../domain/IEncryptionRepository";
import { IEncryptionDataSource } from "./IEncryptionDataSource";
import { SymetricConfig } from "./symetric/common/SymetricEncryptionConfig";
import * as crypto from "crypto";

const DEFAULT_RANDOM_BYTES_LENGHT = 16; 

const randomBytes = (size: number = DEFAULT_RANDOM_BYTES_LENGHT): Buffer => {
    return crypto.randomBytes(size);
};

export class DefaultEncryptionRepository implements IEncryptionRepository {
    private readonly symetericDataSource: IEncryptionDataSource<SymetricConfig>;
    private readonly asynetericDataSource: IEncryptionDataSource<SymetricConfig>;

    constructor(symetericDataSource: IEncryptionDataSource<SymetricConfig>, asynetericDataSource: IEncryptionDataSource<SymetricConfig>) {
        this.symetericDataSource = symetericDataSource;
        this.asynetericDataSource = asynetericDataSource;
    }

    getKeysPair(): IEncrypter {
        throw new Error("method not implemented yet"); //TODO: an asymetric implemention
        //return this.asynetericDataSource.factory();
    }

    getKey(config?: SymetricConfig): IEncrypter {
        config = config || { key:  randomBytes(), iv: randomBytes()};
        return this.symetericDataSource.factory(config);
    }
}