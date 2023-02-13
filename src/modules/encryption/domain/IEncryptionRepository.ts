import { AsymetricEncriptionConfig } from "../data/asymetric/common/AsymetricEncriptionConfig";
import { SymetricConfig } from "../data/symetric/common/SymetricEncryptionConfig";
import { IEncrypter } from "./IEncrypter";

export interface IEncryptionRepository {
    getKeysPair(config?: AsymetricEncriptionConfig): IEncrypter;
    getKey(config?: SymetricConfig): IEncrypter;
};