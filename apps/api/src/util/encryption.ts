import * as bcrypt from "bcrypt";

export const hash = async (text: string): Promise<string> => {
    return await bcrypt.hash(text, await bcrypt.genSalt(4));
};

export const compare = async (text: string, hashedText: string): Promise<boolean> => {
    return await bcrypt.compare(text, hashedText);
};
