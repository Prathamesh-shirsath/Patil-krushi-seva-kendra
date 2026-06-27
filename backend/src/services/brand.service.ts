import { prisma } from "../lib/prisma";

export const createBrand = async (data: {
    name: string;
    slug: string;
    logo?: string;
    description?: string;
    status?: boolean;
}) => {
    return prisma.brand.create({
        data: {
            name: data.name,
            slug: data.slug,
            logo: data.logo,
            description: data.description,
            status: data.status ?? true,
        },
    });
};

export const getAllBrands = async () => {
    return prisma.brand.findMany({
        include: {
            _count: {
                select: {
                    products: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const getBrandById = async (id: string) => {
    return prisma.brand.findUnique({
        where: { id },
        include: {
            _count: {
                select: {
                    products: true,
                },
            },
        },
    });

    
};

export const updateBrand = async (
    id: string,
    data: any
) => {
    return prisma.brand.update({
        where: { id },
        data,
    });
};

export const deleteBrand = async (
    id: string
) => {
    return prisma.brand.delete({
        where: { id },
    });
};

