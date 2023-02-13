import { IEncrypter } from "../domain/IEncrypter";
import { IEncryptionRepository } from "../domain/IEncryptionRepository";
import { IEncryptionDataSource } from "./IEncryptionDataSource";
import { SymetricConfig } from "./symetric/common/SymetricEncryptionConfig";
import * as crypto from "crypto";
import { AsymetricEncriptionConfig } from "./asymetric/common/AsymetricEncriptionConfig";
import { AsymetricEncrypter } from "./asymetric/common/RsaEncrypted";
import { RsaKeyHolder } from "./asymetric/RsaKeyHolder";
import NodeRSA from "node-rsa";

const DEFAULT_RANDOM_BYTES_LENGHT = 16; 

const randomBytes = (size: number = DEFAULT_RANDOM_BYTES_LENGHT): Buffer => {
    return crypto.randomBytes(size);
};

export class DefaultEncryptionRepository implements IEncryptionRepository {
    private readonly symetericDataSource: IEncryptionDataSource<SymetricConfig>;
    private readonly asynetericDataSource: IEncryptionDataSource<NodeRSA>;

    constructor(symetericDataSource: IEncryptionDataSource<SymetricConfig>, asynetericDataSource: IEncryptionDataSource<NodeRSA>) {
        this.symetericDataSource = symetericDataSource;
        this.asynetericDataSource = asynetericDataSource;
    }

    getKeysPair(config?: AsymetricEncriptionConfig, size: number = 2048): IEncrypter {
        let rsa: NodeRSA;
        if(config) { 
            rsa = this.importKey(config);
            return this.asynetericDataSource.factory(rsa);
        }

        rsa = new NodeRSA({b: size});

        return this.asynetericDataSource.factory(rsa);
    }

    getKey(config?: SymetricConfig): IEncrypter {
        config = config || { key:  randomBytes(), iv: randomBytes()};
        return this.symetericDataSource.factory(config);
    }

    private importKey(config: AsymetricEncriptionConfig): NodeRSA {
        try {
            const rsaInstance: NodeRSA = new NodeRSA();

            rsaInstance.importKey(config.key, config.format);

            return rsaInstance;
        } catch(error) {
            throw new Error(`${error}`);
        }
    }
}