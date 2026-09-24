import { prisma } from "../lib/prisma";
import { CreateCartItemInput } from "../types/cart.types";

// =====================================================
// ADD TO CART
// =====================================================

export const addToCart = async (
  data: CreateCartItemInput
) => {
  // Validate product ID
  if (!data.productId) {
    throw new Error("Product ID is required.");
  }

  // Validate quantity
  const quantity = Number(data.quantity);

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error(
      "Quantity must be a valid number greater than 0."
    );
  }

  // =====================================================
  // CHECK PRODUCT
  // =====================================================

  const product = await prisma.product.findUnique({
    where: {
      id: data.productId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      status: true,
    },
  });

  if (!product) {
    throw new Error("Product not found.");
  }

  // Check product active
  if (!product.status) {
    throw new Error(
      "This product is currently unavailable."
    );
  }

  // =====================================================
  // CHECK VARIANT
  // =====================================================

  let stock = product.stock;

  if (data.variantId) {
    const variant = await prisma.productVariant.findFirst({
      where: {
        id: data.variantId,
        productId: data.productId,
        status: true,
      },
      select: {
        id: true,
        stock: true,
      },
    });

    if (!variant) {
      throw new Error(
        "Selected product variant not found."
      );
    }

    stock = variant.stock;
  }

  // Check stock
  if (stock <= 0) {
    throw new Error(
      "This product is currently out of stock."
    );
  }

  // =====================================================
  // FIND USER CART
  // =====================================================

  let cart = await prisma.cart.findUnique({
    where: {
      userId: data.userId,
    },
  });

  // Create cart if it doesn't exist
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId: data.userId,
      },
    });
  }

  // =====================================================
  // CHECK EXISTING CART ITEM
  // =====================================================

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId: data.productId,
      variantId: data.variantId ?? null,
    },
  });

  // Calculate new quantity
  const newQuantity =
    (existingItem?.quantity ?? 0) + quantity;

  // Don't allow quantity above stock
  if (newQuantity > stock) {
    throw new Error(
      `Only ${stock} item(s) available in stock.`
    );
  }

  // =====================================================
  // UPDATE EXISTING ITEM
  // =====================================================

  if (existingItem) {
    return prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },

      data: {
        quantity: newQuantity,
      },

      include: {
        product: {
          include: {
            brand: true,
          },
        },
        variant: true,
      },
    });
  }

  // =====================================================
  // CREATE NEW ITEM
  // =====================================================

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId: data.productId,
      variantId: data.variantId ?? null,
      quantity,
    },

    include: {
      product: {
        include: {
          brand: true,
        },
      },
      variant: true,
    },
  });
};

// =====================================================
// GET CART
// =====================================================

export const getCart = async (
  userId: string
) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },

    include: {
      items: {
        include: {
          product: {
            include: {
              brand: true,
            },
          },
          variant: true,
        },
      },
    },
  });

  if (!cart) {
    return {
      items: [],
      summary: {
        totalItems: 0,
        subTotal: 0,
        deliveryCharge: 0,
        discount: 0,
        grandTotal: 0,
      },
    };
  }

  const items = cart.items.map((item) => {
    // Variant price if variant exists
    const price = item.variant
      ? Number(item.variant.price)
      : Number(item.product.price);

    // Variant pack size if variant exists
    const packSize = item.variant
      ? item.variant.packSize
      : item.product.packSize;

    // Variant stock if variant exists
    const stock = item.variant
      ? item.variant.stock
      : item.product.stock;

    return {
      id: item.id,
      quantity: item.quantity,
      createdAt: item.createdAt,

      variant: item.variant
        ? {
            id: item.variant.id,
            packSize: item.variant.packSize,
            price: Number(item.variant.price),
            stock: item.variant.stock,
            status: item.variant.status,
          }
        : null,

      product: {
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        image: item.product.image,
        price,
        packSize,
        stock,

        brand: {
          id: item.product.brand.id,
          name: item.product.brand.name,
        },
      },
    };
  });

  // =====================================================
  // CART SUMMARY
  // =====================================================

  const subTotal = items.reduce(
    (total, item) =>
      total +
      item.product.price * item.quantity,
    0
  );

  const totalItems = items.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const deliveryCharge =
    subTotal >= 499 ? 0 : 50;

  const discount = 0;

  const grandTotal =
    subTotal +
    deliveryCharge -
    discount;

  return {
    items,

    summary: {
      totalItems,
      subTotal,
      deliveryCharge,
      discount,
      grandTotal,
    },
  };
};

// =====================================================
// UPDATE CART ITEM
// =====================================================

export const updateCartItem = async (
  id: string,
  data: {
    quantity: number;
  }
) => {
  const quantity = Number(
    data.quantity
  );

  if (
    !Number.isInteger(quantity) ||
    quantity < 1
  ) {
    throw new Error(
      "Quantity must be at least 1."
    );
  }

  // Get cart item with product + variant
  const cartItem =
    await prisma.cartItem.findUnique({
      where: {
        id,
      },

      include: {
        product: {
          select: {
            stock: true,
            status: true,
          },
        },

        variant: true,
      },
    });

  if (!cartItem) {
    throw new Error(
      "Cart item not found."
    );
  }

  // Product status
  if (!cartItem.product.status) {
    throw new Error(
      "This product is currently unavailable."
    );
  }

  // Variant status
  if (
    cartItem.variant &&
    !cartItem.variant.status
  ) {
    throw new Error(
      "This product variant is currently unavailable."
    );
  }

  // Use variant stock if variant exists
  const stock = cartItem.variant
    ? cartItem.variant.stock
    : cartItem.product.stock;

  // Check stock
  if (quantity > stock) {
    throw new Error(
      `Only ${stock} item(s) available in stock.`
    );
  }

  return prisma.cartItem.update({
    where: {
      id,
    },

    data: {
      quantity,
    },

    include: {
      product: {
        include: {
          brand: true,
        },
      },
      variant: true,
    },
  });
};

// =====================================================
// REMOVE CART ITEM
// =====================================================

export const removeCartItem = async (
  id: string
) => {
  const cartItem =
    await prisma.cartItem.findUnique({
      where: {
        id,
      },
    });

  if (!cartItem) {
    throw new Error(
      "Cart item not found."
    );
  }

  return prisma.cartItem.delete({
    where: {
      id,
    },
  });
};

// =====================================================
// CLEAR CART
// =====================================================

export const clearCart = async (
  userId: string
) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
  });

  if (!cart) {
    return;
  }

  return prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });
};

// =====================================================
// GET CART COUNT
// =====================================================

export const getCartCount = async (
  userId: string
) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
  });

  if (!cart) {
    return 0;
  }

  const result =
    await prisma.cartItem.aggregate({
      where: {
        cartId: cart.id,
      },

      _sum: {
        quantity: true,
      },
    });

  return result._sum.quantity ?? 0;
};