import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "com.trashtrack.app",
    appName: "TrashTrack",
    webDir: "../../dist/apps/app",
    server: {
        androidScheme: "https",
    },
};

export default config;
