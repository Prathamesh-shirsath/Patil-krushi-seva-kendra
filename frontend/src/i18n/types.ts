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
    toast: {
      addedToCart: string;
      addToCartFailed: string;
    };
  };
  shop: {
    title: string;
    subtitle: string;
    loading: string;
    errorTitle: string;
    errorMessage: string;
    filters: string;
    clearFilters: string;
    clearAllFilters: string;
    showing: string;
    of: string;
    products: string;
    sortBy: string;
    sort: {
      featured: string;
      priceLow: string;
      priceHigh: string;
      rating: string;
    };
    viewGrid: string;
    viewList: string;
    emptyTitle: string;
    emptyMessage: string;
    emptyHint: string;
    filterAll: {
      categories: string;
      brands: string;
      productTypes: string;
      availability: string;
    };
    stock: {
      inStock: string;
      outOfStock: string;
    };
    sections: {
      categories: string;
      brands: string;
      priceRange: string;
      productType: string;
      availability: string;
    };
    price: {
      to: string;
      minPlaceholder: string;
      maxPlaceholder: string;
    };
    benefits: {
      originalProducts: string;
      originalProductsDescription: string;
      fastDelivery: string;
      fastDeliveryDescription: string;
      securePayments: string;
      securePaymentsDescription: string;
      easyReturns: string;
      easyReturnsDescription: string;
      expertSupport: string;
      expertSupportDescription: string;
    };
    aria: {
      closeFilters: string;
      minPrice: string;
      maxPrice: string;
    };
    categoriesPage: {
      title: string;
      subtitle: string;
      searchPlaceholder: string;
      loading: string;
      errorTitle: string;
      errorMessage: string;
      noCategories: string;
      categoryProducts: string;
      categoryLabel: string;
      productsAvailable: string;
      selectCategoryTitle: string;
      selectCategoryMessage: string;
      currentCategory: string;
      loadingProducts: string;
    };
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
  product: {
    notFound: {
      title: string;
      message: string;
      backToShop: string;
    };
    details: {
      quantity: string;
      addWishlist: string;
      removeWishlist: string;
      pleaseWait: string;
      whyShopWithUs: string;
      tabs: {
        description: string;
        specifications: string;
        usageGuide: string;
      };
      emptyFeatures: string;
      emptyCropRecommendations: string;
      emptyUsageGuide: string;
      recommendedFor: string;
      youMayAlsoLike: string;
    };
    aria: {
      previousImage: string;
      nextImage: string;
      viewImage: string;
      decreaseQuantity: string;
      increaseQuantity: string;
    };
  };
  reviews: {
    customerFeedback: string;
    title: string;
    subtitle: string;
    reviewSingle: string;
    reviewPlural: string;
    overallRating: string;
    outOf5: string;
    ratings: string;
    verifiedReviewsTitle: string;
    verifiedReviewsDesc: string;
    writeReview: string;
    writeReviewDesc: string;
    yourRating: string;
    yourReview: string;
    reviewPlaceholder: string;
    submitHint: string;
    submitButton: string;
    submittingButton: string;
    latestFeedback: string;
    loading: string;
    emptyTitle: string;
    emptyMessage: string;
    errorSelectRating: string;
    errorWriteReview: string;
    successMessage: string;
    errorFetch: string;
    errorSubmit: string;
    defaultCustomerName: string;
  };
};
