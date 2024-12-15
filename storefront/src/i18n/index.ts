import { createI18n } from "vue-i18n";
import en from "./locales/en-US.json";
import de from "./locales/de-DE.json";

const i18n = createI18n({
  locale: "de-DE",
  fallbackLocale: "en-US",
  messages: {
    "en-US": en,
    "de-DE": de,
  },
});

export default i18n;
