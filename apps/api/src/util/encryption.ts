import * as bcrypt from "bcrypt";

/**
 * Hashes the given text using bcrypt.
 * @param text The text to be hashed.
 * @returns A promise that resolves to the hashed text.
 */
export const hash = async (text: string): Promise<string> => {
    return await bcrypt.hash(text, await bcrypt.genSalt(4));
};

/**
 * Compares a plain text with a hashed text using bcrypt.
 * @param text The plain text to compare.
 * @param hashedText The hashed text to compare against.
 * @returns A promise that resolves to a boolean indicating whether the plain text matches the hashed text.
 */
export const compare = async (text: string, hashedText: string): Promise<boolean> => {
    return await bcrypt.compare(text, hashedText);
};
