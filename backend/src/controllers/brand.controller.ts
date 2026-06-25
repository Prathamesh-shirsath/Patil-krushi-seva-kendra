import { Request, Response } from "express";

import {
    createBrand,
    getAllBrands,
    updateBrand,
    deleteBrand,
} from "../services/brand.service";

import { uploadImage }
    from "../services/upload.service";

export const createBrandController = async (
    req: Request,
    res: Response
) => {
    try {
        let logo = "";

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

export const deleteBrandController = async (
    req: Request,
    res: Response
) => {
    try {

        await deleteBrand(
            req.params.id as string
        );

        res.json({
            success: true,
            message:
                "Brand deleted successfully",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete brand",
        });

    }
};