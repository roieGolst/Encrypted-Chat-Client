import { IEncrypter } from "./IEncrypter";
import { Message, Sign } from "../common/types";
import { KeyHolder } from "./KeyHoldler";

export abstract class KeysPairHolder implements IEncrypter  {
    protected readonly private: KeyHolder;
    protected readonly public: KeyHolder;

    abstract encrypt(message: Message): string;
    abstract decrypt(message: Message): string; 
    abstract sign(message: Message): string;
    abstract verify(message: Message, sign: Sign): boolean;
};