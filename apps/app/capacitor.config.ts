import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "com.trashtrack.app",
    appName: "TrashTrack",
    webDir: "../../dist/apps/app",
    plugins: {
        CapacitorHttp: {
            enabled: true,
        },
        CapacitorCookies: {
            enabled: true,
        },
    },
};

export default config;
