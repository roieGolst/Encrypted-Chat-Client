import { DefaultEncryptionRepository } from "./data/DefaultEncryptionRepository";
import { IEncryptionDataSource } from "./data/IEncryptionDataSource";
import { AesDataSource } from "./data/symetric/AesDataSource";
import { SymetricConfig } from "./data/symetric/common/SymetricEncryptionConfig";
import { IEncryptionRepository } from "./domain/IEncryptionRepository";

export default class Encryption {

    static factory (
        symetericDataSource: IEncryptionDataSource<SymetricConfig> = new AesDataSource(),
        asynetericDataSource: IEncryptionDataSource<SymetricConfig> = new AesDataSource() //TODO: replace it with an asymetric implemetion;
    ): IEncryptionRepository {
      return new DefaultEncryptionRepository(symetericDataSource, asynetericDataSource);  
    }
}