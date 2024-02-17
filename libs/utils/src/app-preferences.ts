import { Preferences } from "@capacitor/preferences";
import dayjs from "dayjs";

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

export const setPelaporObject = async (pelaporObject: { nik: string; name: string; phoneNo: string }) => {
    await Preferences.set({ key: "pelaporObject", value: JSON.stringify(pelaporObject) });
};

export const getPelaporObject: {
    (): Promise<{ nik: string; name: string; phoneNo: string } | undefined>;
} = async () => {
    const { value } = await Preferences.get({ key: "pelaporObject" });
    return value ? JSON.parse(value) : undefined;
};

export function formatDateTimeAgo(dateTime: dayjs.Dayjs): string {
    const now = dayjs();
    const diff = now.diff(dateTime, "seconds");

    if (diff < 60) {
        // Less than a minute
        return `${diff} seconds ago`;
    } else if (diff < 3600) {
        // Less than an hour
        const minutes = Math.floor(diff / 60);
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (diff < 86400) {
        // Less than a day
        const hours = Math.floor(diff / 3600);
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (diff < 2592000) {
        // Less than a month
        const days = Math.floor(diff / 86400);
        return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (diff < 31536000) {
        // Less than a year
        const months = Math.floor(diff / 2592000);
        return `${months} month${months > 1 ? "s" : ""} ago`;
    } else {
        // More than a year
        return dayjs(dateTime).format("MMMM D, YYYY"); // Full date format
    }
}
