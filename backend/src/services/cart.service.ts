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

  // Check product exists
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

  // Check stock
  if (product.stock <= 0) {
    throw new Error(
      "This product is currently out of stock."
    );
  }

  // Find user's cart
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

  // Check existing cart item
  const existingItem =
    await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: data.productId,
        },
      },
    });

  // Calculate new quantity
  const newQuantity =
    (existingItem?.quantity ?? 0) + quantity;

  // Don't allow quantity above stock
  if (newQuantity > product.stock) {
    throw new Error(
      `Only ${product.stock} item(s) available in stock.`
    );
  }

  // Add / update cart item
  const cartItem =
    await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: data.productId,
        },
      },

      update: {
        quantity: newQuantity,
      },

      create: {
        cartId: cart.id,
        productId: data.productId,
        quantity,
      },

      include: {
        product: {
          include: {
            brand: true,
          },
        },
      },
    });

  return cartItem;
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

  const items = cart.items.map(
    (item) => ({
      id: item.id,
      quantity: item.quantity,
      createdAt: item.createdAt,

      product: {
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        image: item.product.image,
        price: Number(
          item.product.price
        ),
        packSize: item.product.packSize,
        stock: item.product.stock,

        brand: {
          id: item.product.brand.id,
          name: item.product.brand.name,
        },
      },
    })
  );

  const subTotal = items.reduce(
    (total, item) =>
      total +
      item.product.price *
        item.quantity,
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

  // Get cart item with product
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
      },
    });

  if (!cartItem) {
    throw new Error(
      "Cart item not found."
    );
  }

  if (!cartItem.product.status) {
    throw new Error(
      "This product is currently unavailable."
    );
  }

  if (
    quantity >
    cartItem.product.stock
  ) {
    throw new Error(
      `Only ${cartItem.product.stock} item(s) available in stock.`
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