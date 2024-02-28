import crypto from "browser-crypto";
import { Buffer } from "buffer";
import { HASH } from "..";

export default function (textEncrypted: string) {
    try {
        if (typeof HASH === "string" && HASH.length < 32)
            new Error("Key lenght must be 32 characters");
        if (!HASH) new Error("Key dont exist");

        const KEY = Buffer.from(HASH as string);
        let [IV, text] = textEncrypted.split(":") as (string | Buffer)[];
        IV = Buffer.from(IV as string, "hex");
        text = Buffer.from(text as string, "hex");
        const decipher = crypto.createDecipheriv("aes-256-cbc", KEY, IV);
        let data = decipher.update(text);
        data = Buffer.concat([data, decipher.final()]);

        return data.toString();
    } catch (e) {
        console.error((e as Error).message);
    }
}
