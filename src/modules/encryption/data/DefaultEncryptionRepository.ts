import { IEncrypter } from "../domain/IEncrypter";
import { IEncryptionRepository } from "../domain/IEncryptionRepository";
import { IEncryptionDataSource } from "./IEncryptionDataSource";
import { SymetricConfig } from "./symetric/common/SymetricEncryptionConfig";
import * as crypto from "crypto";
import { AsymetricEncriptionConfig } from "./asymetric/common/AsymetricEncriptionConfig";
import { AsymetricEncrypter } from "./asymetric/common/RsaEncrypted";
import { RsaKeyHolder } from "./asymetric/RsaKeyHolder";

const DEFAULT_RANDOM_BYTES_LENGHT = 16; 

const randomBytes = (size: number = DEFAULT_RANDOM_BYTES_LENGHT): Buffer => {
    return crypto.randomBytes(size);
};

export class DefaultEncryptionRepository implements IEncryptionRepository {
    private readonly symetericDataSource: IEncryptionDataSource<SymetricConfig>;
    private readonly asynetericDataSource: IEncryptionDataSource<AsymetricEncriptionConfig>;

    constructor(symetericDataSource: IEncryptionDataSource<SymetricConfig>, asynetericDataSource: IEncryptionDataSource<AsymetricEncriptionConfig>) {
        this.symetericDataSource = symetericDataSource;
        this.asynetericDataSource = asynetericDataSource;
    }

    getKeysPair(config?: AsymetricEncriptionConfig): IEncrypter {
        config = config || {privateKey: new RsaKeyHolder(), publicKey: new RsaKeyHolder()};

        return this.asynetericDataSource.factory(config);
    }

    getKey(config?: SymetricConfig): IEncrypter {
        config = config || { key:  randomBytes(), iv: randomBytes()};
        return this.symetericDataSource.factory(config);
    }
}