import slugify from "slugify";
import { prisma } from "../lib/prisma";

export const generateUniqueSlug = async (
    name: string
): Promise<string> => {
    const baseSlug = slugify(name, {
        lower: true,
        strict: true,
        trim: true,
    });

    let slug = baseSlug;
    let counter = 1;

    while (true) {
        const exists = await prisma.product.findUnique({
            where: {
                slug,
            },
        });

        if (!exists) {
            return slug;
        }

        counter++;

        slug = `${baseSlug}-${counter}`;
    }
};