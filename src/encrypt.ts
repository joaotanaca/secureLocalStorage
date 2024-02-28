import crypto from "browser-crypto";
import { Buffer } from "buffer";
import { HASH } from "..";

export default function (text: string): string {
    try {
        if (typeof HASH === "string" && HASH.length < 32)
            new Error("Key lenght must be 32 characters");
        if (!HASH) new Error("Key dont exist");

        const IV: string | Buffer = Buffer.from(HASH as string)
            .reverse()
            .subarray(0, 16);
        const KEY = Buffer.from(HASH as string);

        const cipher = crypto.createCipheriv("aes-256-cbc", KEY, IV);
        let data = cipher.update(text);
        data = Buffer.concat([data, cipher.final()]);

        return `${IV.toString("hex")}:${data.toString("hex")}}`;
    } catch (e) {
        console.error((e as Error).stack);
        return "";
    }
}
