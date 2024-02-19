import "react-i18next";
import en from "../apps/app/src/locales/en.json";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "translation";
        resources: typeof en;
    }
}
