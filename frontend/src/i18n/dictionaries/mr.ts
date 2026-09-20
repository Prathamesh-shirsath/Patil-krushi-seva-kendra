import type { TranslationDictionary } from "../types";

const mr = {
  language: {
    label: "भाषा निवडा",
    english: "English",
    marathi: "मराठी",
  },
  navigation: {
    home: "मुख्यपृष्ठ",
    shop: "दुकान",
    categories: "श्रेणी",
    brands: "ब्रँड",
    about: "आमच्याबद्दल",
    contact: "संपर्क",
  },
  common: {
    search: "शोधा",
    addToCart: "कार्टमध्ये जोडा",
    buyNow: "आत्ता खरेदी करा",
    viewAll: "सर्व पहा",
  },
  account: {
    login: "लॉग इन",
    logout: "लॉग आउट",
    profile: "माझे प्रोफाइल",
  },
  cart: {
    label: "कार्ट",
  },
  wishlist: {
    label: "इच्छा यादी",
  },
  orders: {
    label: "माझ्या ऑर्डर्स",
  },
} satisfies TranslationDictionary;

export default mr;
