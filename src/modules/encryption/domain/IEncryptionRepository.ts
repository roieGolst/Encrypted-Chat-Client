import { SymetricConfig } from "../data/symetric/common/SymetricEncryptionConfig";
import { IEncrypter } from "./IEncrypter";

export interface IEncryptionRepository {
    getKeysPair(): IEncrypter;
    getKey(config?: SymetricConfig): IEncrypter;
};