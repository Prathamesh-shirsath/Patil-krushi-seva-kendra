import { Request, Response } from "express";

import {
    createBrand,
    getAllBrands,
    updateBrand,
    deleteBrand,
} from "../services/brand.service";

import { uploadImage }
    from "../services/upload.service";


import {
    deleteImage,
} from "../services/upload.service";
import {
    getBrandById,
} from "../services/brand.service";




export const createBrandController = async (
    req: Request,
    res: Response
) => {
    try {
        // Future Cloudflare flow: admin uploads to Cloudflare, then backend stores the returned URL as this string.
        let logo = req.body.logo;

        if (req.file) {
            logo = await uploadImage(req.file);
        }

        const brand = await createBrand({
            name: req.body.name,
            slug: req.body.slug,
            description: req.body.description,
            status: req.body.status === "true",
            logo,
        });

        res.status(201).json({
            success: true,
            data: brand,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create brand",
        });
    }
};

export const getAllBrandsController =
    async (
        req: Request,
        res: Response
    ) => {

        const brands =
            await getAllBrands();

        res.json({
            success: true,
            data: brands,
        });

    };

export const updateBrandController = async (
    req: Request,
    res: Response
) => {
    try {

        let data: any = {
            ...req.body,
        };

        if (req.file) {

            const logo =
                await uploadImage(req.file);

            data.logo = logo;
        }

        const brand =
            await updateBrand(
                req.params.id as string,
                data
            );

        res.json({
            success: true,
            data: brand,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update brand",
        });

    }
};

export const deleteBrandController =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const brand =
                await getBrandById(
                    req.params.id as string
                );

            if (!brand) {

                return res
                    .status(404)
                    .json({
                        success: false,
                        message:
                            "Brand not found",
                    });

            }

            await deleteBrand(req.params.id as string);

            res.json({
                success: true,
                message: "Brand deleted successfully",
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message: "Failed to delete brand",
            });

        }
};
