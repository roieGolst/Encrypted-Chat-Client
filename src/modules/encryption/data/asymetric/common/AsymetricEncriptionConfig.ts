import { Format } from "node-rsa";
import { RsaKeyHolder } from "../RsaKeyHolder";

export type AsymetricEncriptionConfig = {
    size: number,
    format: Format,
    keys?: {
        publicKey?: string | Buffer,
        privateKey?: string | Buffer
    }
};