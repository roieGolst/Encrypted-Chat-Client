import NodeRSA from "node-rsa";

export type Format = NodeRSA.Format; 
export type AsymetricKeyInstance = NodeRSA;

export type AsymetricEncriptionConfig = {
    key: string | Buffer,
    format?: Format
};