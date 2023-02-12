import { RsaKeyHolder } from "../RsaKeyHolder";

export type AsymetricEncriptionConfig = {
    publicKey?: RsaKeyHolder,
    privateKey?: RsaKeyHolder
};