import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "com.biotrack.app",
    appName: "BioTrack",
    webDir: "dist/apps/app",
    server: {
        androidScheme: "https",
    },
};

export default config;
