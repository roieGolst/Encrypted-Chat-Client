import { AsymetricEncriptionConfig } from "./data/asymetric/common/AsymetricEncriptionConfig";
import { RsaDataSource } from "./data/asymetric/RsaDataSource";
import { DefaultEncryptionRepository } from "./data/DefaultEncryptionRepository";
import { IEncryptionDataSource } from "./data/IEncryptionDataSource";
import { AesDataSource } from "./data/symetric/AesDataSource";
import { SymetricConfig } from "./data/symetric/common/SymetricEncryptionConfig";
import { IEncryptionRepository } from "./domain/IEncryptionRepository";

export default class Encryption {

    static factory (
        symetericDataSource: IEncryptionDataSource<SymetricConfig> = new AesDataSource(),
        asynetericDataSource: IEncryptionDataSource<AsymetricEncriptionConfig> = new RsaDataSource() //TODO: replace it with an asymetric implemetion;
    ): IEncryptionRepository {
      return new DefaultEncryptionRepository(symetericDataSource, asynetericDataSource);  
    }
}