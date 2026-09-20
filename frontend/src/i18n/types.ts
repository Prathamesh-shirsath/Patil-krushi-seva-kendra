export type Locale = "en" | "mr";

export type TranslationDictionary = {
  language: {
    label: string;
    english: string;
    marathi: string;
  };
  navigation: {
    home: string;
    shop: string;
    categories: string;
    brands: string;
    about: string;
    contact: string;
  };
  common: {
    search: string;
    addToCart: string;
    buyNow: string;
    viewAll: string;
  };
  account: {
    login: string;
    logout: string;
    profile: string;
  };
  cart: {
    label: string;
  };
  wishlist: {
    label: string;
  };
  orders: {
    label: string;
  };
};
