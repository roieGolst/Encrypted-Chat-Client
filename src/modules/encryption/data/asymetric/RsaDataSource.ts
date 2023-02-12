import { Message } from "../../common/types";
import { IEncrypter } from "../../domain/IEncrypter";
import { IEncryptionDataSource } from "../IEncryptionDataSource";
import { AsymetricEncriptionConfig } from "./common/AsymetricEncriptionConfig";
import { RsaKeyHolder } from "./RsaKeyHolder";



// class RsaKeysPairHolder implements IEncrypter {
//     protected readonly privateKey?: RsaKeyHolder;
//     protected readonly publicKey?: RsaKeyHolder;

//     constructor(config: AsymetricEncriptionConfig) {
//         this.privateKey = config.privateKey;
//         this.publicKey = config.publicKey
//     }

//     encrypt(message: Message): string {
//         if(!this.publicKey) {
//             throw new Error("Information cannot be encrypted without a key");
//         }
//         return this.publicKey.encrypt(message);
//     }
    
//     decrypt(message: Message): string {
//         if(!this.publicKey) {
//             throw new Error("Information cannot be encrypted without a key");
//         }

//         return this.publicKey.decrypt(message);
//     }

//     sign(message: Message): string {
//         throw new Error("Method not implemented.");
//     }
//     verify(message: Message, sign: string): boolean {
//         throw new Error("Method not implemented.");
//     }
    
// }

export class RsaDataSource implements IEncryptionDataSource<AsymetricEncriptionConfig> {
    factory(config: AsymetricEncriptionConfig): IEncrypter {
        if(!)
        const rsaInstance = new Node()
        return new RsaKeyHolder(2048, config);
    }

}