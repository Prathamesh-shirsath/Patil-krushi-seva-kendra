import type { TranslationDictionary } from "../types";

const en = {
  language: {
    label: "Select language",
    english: "English",
    marathi: "मराठी",
  },
  navigation: {
    home: "Home",
    shop: "Shop",
    categories: "Categories",
    brands: "Brands",
    about: "About",
    contact: "Contact",
  },
  common: {
    search: "Search",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    viewAll: "View All",
  },
  account: {
    login: "Login",
    logout: "Logout",
    profile: "My Profile",
  },
  cart: {
    label: "Cart",
  },
  wishlist: {
    label: "Wishlist",
  },
  orders: {
    label: "My Orders",
  },
} satisfies TranslationDictionary;

export default en;
