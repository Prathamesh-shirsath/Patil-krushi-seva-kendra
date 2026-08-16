import { prisma } from "../lib/prisma";

import {
  CreateProductInput,
  UpdateProductInput,
} from "../types/product.types";

import {
  generateUniqueSlug,
} from "../utils/slug.util";

// =====================================================
// CREATE PRODUCT
// =====================================================

export const createProduct = async (
  data: CreateProductInput
) => {
  const slug = await generateUniqueSlug(
    data.name
  );

  return prisma.product.create({
    data: {
      name: data.name,
      slug,
      description: data.description,

      categoryId: data.categoryId,
      brandId: data.brandId,

      packSize: data.packSize,
      price: data.price,

      stock: data.stock ?? 0,

      image: data.image ?? null,

      usedForCrops:
        data.usedForCrops ?? [],

      status:
        data.status ?? true,

      variants:
        data.variants &&
          data.variants.length > 0
          ? {
            create:
              data.variants.map(
                (variant) => ({
                  packSize:
                    variant.packSize,

                  price:
                    variant.price,
                })
              ),
          }
          : undefined,
    },

    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },

      brand: {
        select: {
          id: true,
          name: true,
        },
      },

      variants: true,
    },
  });
};

// =====================================================
// GET ALL PRODUCTS
// =====================================================

export const getAllProducts = async (
  page = 1,
  limit = 10,
  search?: string,
  brandId?: string,
  categoryId?: string,
  includeInactive = false
) => {
  const where: any = {
    ...(includeInactive
      ? {}
      : {
        status: true,
      }),

    ...(search && {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },

        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },

        {
          packSize: {
            contains: search,
            mode: "insensitive",
          },
        },

        {
          brand: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ],
    }),

    ...(brandId && {
      brandId,
    }),

    ...(categoryId && {
      categoryId,
    }),
  };

  const [products, total] =
    await Promise.all([
      prisma.product.findMany({
        where,

        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },

          brand: {
            select: {
              id: true,
              name: true,
            },
          },

          variants: true,
        },

        orderBy: {
          createdAt: "desc",
        },

        skip: (page - 1) * limit,

        take: limit,
      }),

      prisma.product.count({
        where,
      }),
    ]);

  return {
    products,

    pagination: {
      page,
      limit,
      total,
      totalPages:
        Math.ceil(total / limit),
    },
  };
};

// =====================================================
// GET PRODUCT BY ID OR SLUG
// =====================================================

export const getProductBySlug = async (
  idOrSlug: string
) => {
  return prisma.product.findFirst({
    where: {
      OR: [
        {
          id: idOrSlug,
        },
        {
          slug: idOrSlug,
        },
      ],
    },

    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },

      brand: {
        select: {
          id: true,
          name: true,
        },
      },

      variants: true,
    },
  });
};

// =====================================================
// UPDATE PRODUCT
// =====================================================

export const updateProduct = async (
  id: string,
  data: UpdateProductInput
) => {
  const existing =
    await prisma.product.findUnique({
      where: {
        id,
      },
    });

  if (!existing) {
    throw new Error(
      "Product not found"
    );
  }

  const updateData: any = {};

  // ---------------------------------------------------
  // Name + slug
  // ---------------------------------------------------

  if (
    data.name !== undefined &&
    data.name !== existing.name
  ) {
    updateData.name = data.name;

    updateData.slug =
      await generateUniqueSlug(
        data.name
      );
  }

  // ---------------------------------------------------
  // Basic fields
  // ---------------------------------------------------

  if (
    data.description !== undefined
  ) {
    updateData.description =
      data.description;
  }

  if (
    data.categoryId !== undefined
  ) {
    updateData.categoryId =
      data.categoryId;
  }

  if (
    data.brandId !== undefined
  ) {
    updateData.brandId =
      data.brandId;
  }

  if (
    data.packSize !== undefined
  ) {
    updateData.packSize =
      data.packSize;
  }

  if (
    data.price !== undefined
  ) {
    updateData.price =
      data.price;
  }

  if (
    data.stock !== undefined
  ) {
    updateData.stock =
      data.stock;
  }

  if (
    data.image !== undefined
  ) {
    updateData.image =
      data.image;
  }

  if (
    data.usedForCrops !== undefined
  ) {
    updateData.usedForCrops =
      data.usedForCrops;
  }

  if (
    data.status !== undefined
  ) {
    updateData.status =
      data.status;
  }

  // ---------------------------------------------------
  // Variants
  // ---------------------------------------------------

  if (
    data.variants !== undefined
  ) {
    updateData.variants = {
      deleteMany: {},

      create:
        data.variants.map(
          (variant) => ({
            packSize:
              variant.packSize,

            price:
              variant.price,
          })
        ),
    };
  }

  // ---------------------------------------------------
  // Update
  // ---------------------------------------------------

  return prisma.product.update({
    where: {
      id,
    },

    data: updateData,

    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },

      brand: {
        select: {
          id: true,
          name: true,
        },
      },

      variants: true,
    },
  });
};

// =====================================================
// DELETE / DEACTIVATE PRODUCT
// =====================================================

export const deleteProduct = async (
  id: string
) => {
  return prisma.product.update({
    where: {
      id,
    },

    data: {
      status: false,
    },
  });
};