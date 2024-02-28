import dotenv from "dotenv";
import CYPHER_ENCRYPT from "./src/encrypt";
import CYPHER_DECRYPT from "./src/decrypt";
dotenv.config();

export const HASH =
    process.env.VITE_SECURE_LOCAL_STORAGE_HASH_KEY ||
    process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY ||
    process.env.SECURE_LOCAL_STORAGE_HASH_KEY;

const PREFIX =
    process.env.VITE_SECURE_LOCAL_STORAGE_PREFIX ||
    process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY ||
    process.env.SECURE_LOCAL_STORAGE_HASH_KEY ||
    "@secureLocalStoragePrefix";

export default {
    get(name: string) {
        const nameEcrypt = CYPHER_ENCRYPT(name);
        const value: string | null = localStorage.getItem(
            `${PREFIX}.${nameEcrypt}`,
        );
        if (!value) {
            return null;
        }
        return CYPHER_DECRYPT(value as string);
    },
    set(name: string, value: unknown) {
        const nameEcrypt = CYPHER_ENCRYPT(name);
        let valueEcrypt =
            typeof value === "object" ? JSON.stringify(value) : `${value}`;
        valueEcrypt = CYPHER_ENCRYPT(valueEcrypt);
        localStorage.setItem(`${PREFIX}.${nameEcrypt}`, valueEcrypt);
    },
    remove(name: string) {
        const nameEcrypt = CYPHER_ENCRYPT(name);
        localStorage.removeItem(`${PREFIX}.${nameEcrypt}`);
    },
};
