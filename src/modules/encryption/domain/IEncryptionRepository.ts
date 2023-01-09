import { IEncrypter } from "./IEncrypter";

export type Message = string;
export type Sign = string;

export interface IEncryptionRepository {
    getKeysPair(): IEncrypter;
    getKey(): IEncrypter;  
};