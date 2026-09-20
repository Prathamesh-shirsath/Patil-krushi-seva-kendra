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
    continueShopping: string;
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
    title: string;
    summary: {
      title: string;
      totalItems: string;
      subtotal: string;
      deliveryCharge: string;
      free: string;
      discount: string;
      grandTotal: string;
      checkout: string;
      clear: string;
    };
    empty: {
      title: string;
      message: string;
    };
    item: {
      packSize: string;
      stock: string;
      remove: string;
    };
    aria: {
      decreaseQuantity: string;
      increaseQuantity: string;
    };
    toast: {
      cleared: string;
      clearFailed: string;
      removed: string;
      removeFailed: string;
      updated: string;
      updateFailed: string;
    };
  };
  wishlist: {
    label: string;
    hero: {
      premiumBadge: string;
      title1: string;
      title2: string;
      description: string;
      share: string;
    };
    stats: {
      savedProducts: string;
      wishlistValue: string;
      offers: string;
      backInStock: string;
    };
    filters: {
      search: string;
      categories: {
        all: string;
        seeds: string;
        fertilizers: string;
        pesticides: string;
        bioProducts: string;
      };
      sortOptions: {
        newest: string;
        priceLowHigh: string;
        priceHighLow: string;
        highestRated: string;
      };
      filter: string;
      clear: string;
      sort: string;
      showing: string;
      productsInWishlist: string;
    };
    grid: {
      title: string;
      items: string;
    };
    card: {
      packSize: string;
      addCart: string;
      view: string;
      remove: string;
      removing: string;
    };
    summary: {
      title: string;
      subtitle: string;
      products: string;
      savings: string;
      estimatedSavings: string;
      estimatedTotal: string;
      addAll: string;
      addingProducts: string;
    };
    benefits: {
      title: string;
      delivery: string;
      deliverySubtitle: string;
      genuine: string;
      genuineSubtitle: string;
      offers: string;
      offersSubtitle: string;
    };
    cta: {
      title: string;
      description: string;
      explore: string;
    };
    empty: {
      title: string;
      message: string;
    };
    toast: {
      added: string;
      addFailed: string;
      removed: string;
      removeFailed: string;
      empty: string;
      addAllSuccess: (count: number) => string;
      addAllPartial: (success: number, failed: number) => string;
      addAllError: string;
      genericError: string;
    };
  };
  checkout: {
    header: {
      breadcrumbs: {
        cart: string;
        deliveryPayment: string;
        confirmation: string;
      };
      secureCheckout: string;
      title: string;
      subtitle: string;
    };
    auth: {
      warningTitle: string;
      warningDesc: string;
      signIn: string;
    };
    address: {
      title: string;
      subtitle: string;
      addBtn: string;
      emptyTitle: string;
      emptyDesc: string;
      addNewBtn: string;
      defaultBadge: string;
      deliveringTo: string;
    };
    payment: {
      title: string;
      subtitle: string;
      sslBadge: string;
      razorpayTitle: string;
      instantBadge: string;
      razorpayDesc: string;
      upiBadge: string;
      cardsBadge: string;
      netBankingBadge: string;
      codTitle: string;
      codDesc: string;
    };
    trust: {
      genuineTitle: string;
      genuineDesc: string;
      secureTitle: string;
      secureDesc: string;
      deliveryTitle: string;
      deliveryDesc: string;
    };
    summary: {
      title: string;
      item: string;
      items: string;
      qty: string;
      taxesDesc: string;
    };
    actions: {
      processing: string;
      payRazorpay: (amount: string) => string;
      confirmCod: string;
      loadingDetails: string;
    };
    toast: {
      signInRequiredCheckout: string;
      addressRequired: string;
      cartEmpty: string;
      verifyingPayment: string;
      paymentSuccess: string;
      verifyFailed: string;
      verifyFailedGeneric: string;
      paymentCancelled: string;
      paymentFailed: string;
      paymentInitFailed: string;
      signInRequiredOrder: string;
      codSuccess: string;
      codFailed: string;
      orderFailedGeneric: string;
    };
  };
  profile: {
    addressDialog: {
      addTitle: string;
      editTitle: string;
      labels: {
        fullName: string;
        phone: string;
        state: string;
        district: string;
        taluka: string;
        village: string;
        city: string;
        pincode: string;
        address: string;
        landmark: string;
      };
      placeholders: {
        fullName: string;
        phone: string;
        state: string;
        district: string;
        taluka: string;
        village: string;
        city: string;
        pincode: string;
        address: string;
        landmark: string;
      };
      validation: {
        nameRequired: string;
        nameMin: string;
        phoneRequired: string;
        phonePattern: string;
        stateRequired: string;
        stateMin: string;
        districtRequired: string;
        districtMin: string;
        villageRequired: string;
        villageMin: string;
        pincodeRequired: string;
        pincodePattern: string;
        addressRequired: string;
        addressMin: string;
      };
      buttons: {
        cancel: string;
        update: string;
        add: string;
        saving: string;
      };
      toast: {
        updateSuccess: string;
        addSuccess: string;
        error: string;
      };
    };
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
