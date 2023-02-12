import * as crypto from "crypto";

export const DEFAULT_INPUT_ENCODING: string = "utf-8";
export const DEFAULT_OUTPUT_ENCODING = "base64";

export type InputEncodeing = crypto.Encoding;
export type OutputEncodeing = crypto.Encoding;

export type Message = {
    content: string,
    inputEncoding?: InputEncodeing,
    outputEncoding?: OutputEncodeing
};

export type Sign = string;