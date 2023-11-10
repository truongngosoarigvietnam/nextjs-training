
import { createI18n } from 'vue-i18n'
import viLanguage from "@/language/translation/vi/home.json"
import enLanguage from "@/language/translation/en/home.json"





const lang = localStorage.getItem("language") || "vn";
const i18n = createI18n({
    locale: lang,
    allowComposition: true, // you need to specify that!
    messages: {
      en: enLanguage,
      vn: viLanguage
    }
  })


export default i18n;