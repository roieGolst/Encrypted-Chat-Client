import * as crypto from "crypto";

export type InputEncodeing = crypto.Encoding;
export type OutputEncodeing = crypto.Encoding;

export type Message = {
    content: string,
    inputEncoding?: InputEncodeing,
    outputEncoding?: OutputEncodeing
};

export type Sign = string;