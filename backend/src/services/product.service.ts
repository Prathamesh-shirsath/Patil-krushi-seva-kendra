import { prisma } from "../lib/prisma";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../types/product.types";
import { generateUniqueSlug } from "../utils/slug.util";

export const createProduct = async (data: CreateProductInput) => {
  const slug = await generateUniqueSlug(data.name);

  return prisma.product.create({
    data: {
      name: data.name,
      slug,
      description: data.description,

      categoryId: data.categoryId,
      brandId: data.brandId,

      packSize: data.packSize,
      price: data.price,
      

      image: data.image,

      usedForCrops: data.usedForCrops,

      status: data.status,

      variants:
        data.variants && data.variants.length > 0
          ? {
            create: data.variants.map((variant) => ({
              packSize: variant.packSize,
              price: variant.price,
            })),
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

export const getAllProducts = async (
  page = 1,
  limit = 10,
  search?: string,
  brandId?: string,
  categoryId?: string
) => {
  const where = {
    status: true,

    ...(search && {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          packSize: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          brand: {
            name: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        },
      ],
    }),

    ...(brandId && { brandId }),

    ...(categoryId && { categoryId }),
  };

  const [products, total] = await Promise.all([
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
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getProductBySlug = async (slug: string) => {
  return prisma.product.findUnique({
    where: {
      slug,
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

export const updateProduct = async (
  id: string,
  data: UpdateProductInput
) => {
  const updateData: any = {};

  if (data.name) {
    updateData.name = data.name;
    updateData.slug = await generateUniqueSlug(data.name);
  }

  if (data.description !== undefined)
    updateData.description = data.description;

  if (data.categoryId !== undefined)
    updateData.categoryId = data.categoryId;

  if (data.brandId !== undefined)
    updateData.brandId = data.brandId;

  if (data.packSize !== undefined)
    updateData.packSize = data.packSize;

  if (data.price !== undefined)
    updateData.price = data.price;

  if (data.stock !== undefined)
    updateData.stock = data.stock;

  if (data.image !== undefined)
    updateData.image = data.image;

  if (data.usedForCrops !== undefined)
    updateData.usedForCrops = data.usedForCrops;

  if (data.status !== undefined)
    updateData.status = data.status;

  if (data.variants !== undefined) {
    await prisma.productVariant.deleteMany({
      where: {
        productId: id,
      },
    });

    updateData.variants = {
      create: data.variants.map((variant) => ({
        packSize: variant.packSize,
        price: variant.price,
      })),
    };
  }

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

export const deleteProduct = async (id: string) => {
  return prisma.product.update({
    where: {
      id,
    },

    data: {
      status: false,
    },
  });
};