import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enJSON from "./locales/en.json";
import idJSON from "./locales/id.json";

export const resources = {
    en: {
        // translation: {
        ...enJSON,
        // },
    },
    id: {
        // ...idJSON,
        // translation: {
        ...idJSON,
        // },
    },
} as const;

i18n.use(initReactI18next).init({
    lng: "id",
    fallbackLng: "id",
    keySeparator: ".",
    ns: ["translation"],
    defaultNS: "translation",
    resources,
    interpolation: {
        escapeValue: false,
    },
    compatibilityJSON: "v3",
});

const t = i18n.t.bind(i18n);
