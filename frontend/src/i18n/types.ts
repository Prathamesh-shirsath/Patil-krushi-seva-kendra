export type Locale = "en" | "mr";

export type TranslationDictionary = {
  language: {
    label: string;
    english: string;
    marathi: string;
  };
  header: {
    brandName: string;
    logoAlt: string;
    freeDelivery: string;
    qualityProducts: string;
    tagline: string;
    searchPlaceholder: string;
    searchLabel: string;
    wishlistLabel: string;
    cartLabel: string;
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
    addingToCart: string;
    buyNow: string;
    viewAll: string;
    brandLabel: string;
    productFallback: string;
    genericBrand: string;
  };
  account: {
    login: string;
    logout: string;
    profile: string;
    adminDashboard: string;
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
  footer: {
    description: string;
    quickLinks: string;
    categories: string;
    customerSupport: string;
    contact: string;
    seeds: string;
    fertilizers: string;
    pesticides: string;
    organicFarming: string;
    plantGrowth: string;
    faq: string;
    shippingPolicy: string;
    privacyPolicy: string;
    terms: string;
    returns: string;
    location: string;
    hours: string;
    copyright: string;
  };
  home: {
    hero: {
      fallbackLabel: string;
      fallbackTitle: string;
      fallbackSubtitle: string;
      exploreCategories: string;
      genuineProducts: string;
      fastDelivery: string;
      trustedBrands: string;
      previousBanner: string;
      nextBanner: string;
      goToBanner: string;
      openBanner: string;
    };
    features: {
      qualityProducts: string;
      qualityProductsDescription: string;
      fastDelivery: string;
      fastDeliveryDescription: string;
      securePayment: string;
      securePaymentDescription: string;
      expertSupport: string;
      expertSupportDescription: string;
    };
    categories: {
      featured: string;
      title: string;
      description: string;
      noCategories: string;
    };
    brands: {
      trustedPartners: string;
      title: string;
      noBrands: string;
      viewBrandDetails: string;
    };
    featuredProducts: {
      eyebrow: string;
      title: string;
      description: string;
      empty: string;
    };
    bestSelling: {
      eyebrow: string;
      title: string;
      description: string;
      empty: string;
    };
    productsByCategory: {
      eyebrow: string;
      title: string;
      description: string;
      viewAllCategories: string;
      noCategories: string;
      product: string;
      products: string;
    };
    statistics: {
      eyebrow: string;
      title: string;
      happyFarmers: string;
      happyFarmersDescription: string;
      products: string;
      productsDescription: string;
      trustedBrands: string;
      trustedBrandsDescription: string;
      customerSatisfaction: string;
      customerSatisfactionDescription: string;
    };
    newsletter: {
      title: string;
      description: string;
      emailPlaceholder: string;
      subscribe: string;
    };
    productSection: {
      previous: string;
      next: string;
    };
  };
};
