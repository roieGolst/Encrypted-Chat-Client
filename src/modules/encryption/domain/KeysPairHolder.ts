import { IEncrypter } from "./IEncrypter";
import { Message, Sign } from "./IEncryptionRepository";
import { IKeyHolder } from "./KeyHoldler";

export abstract class KeysPairHolder implements IEncrypter  {
    protected readonly private: IKeyHolder;
    protected readonly public: IKeyHolder;

    abstract encrypt(message: Message): TBD;
    abstract decrypt(message: Message): TBD; 
    abstract sign(message: Message): TBD;
    abstract verify(message: Message, sign: Sign): boolean;
};