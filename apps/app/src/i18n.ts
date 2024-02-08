import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enJSON from "./locales/en.json";
import idJSON from "./locales/id.json";

export const resources = {
    en: {
        ...enJSON,
    },
    id: {
        ...idJSON,
    },
} as const;

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    resources,
    interpolation: {
        escapeValue: false,
    },
});
