import NodeRSA, { Format } from "node-rsa";
import { RsaKeyHolder } from "../RsaKeyHolder";

export type AsymetricEncriptionConfig = {
    key: string | Buffer,
    format?: Format,
};