import { Preferences } from "@capacitor/preferences";

export const setIsUserOnboarded = async (isUserOnboarded: boolean) => {
    const stringValue = isUserOnboarded.toString();
    await Preferences.set({ key: "isUserOnboarded", value: stringValue });
};

export const getIsUserOnboarded = async () => {
    const { value } = await Preferences.get({ key: "isUserOnboarded" });
    return value === "true";
};

export const getUserNIK = async (): Promise<number | undefined> => {
    const { value } = await Preferences.get({ key: "userNIK" });
    return value ? parseInt(value) : undefined;
};

export const setUserNIK = async (userNIK: number): Promise<void> => {
    await Preferences.set({ key: "userNIK", value: userNIK.toString() });
};
