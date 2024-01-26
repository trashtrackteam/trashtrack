import { Preferences } from "@capacitor/preferences";

export const setIsUserOnboarded = async (isUserOnboarded: boolean) => {
    const stringValue = isUserOnboarded.toString();
    await Preferences.set({ key: "isUserOnboarded", value: stringValue });
};

export const getIsUserOnboarded = async () => {
    const { value } = await Preferences.get({ key: "isUserOnboarded" });
    return value === "true";
};
