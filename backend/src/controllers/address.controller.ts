import { Request, Response } from "express";
import * as addressService from "../services/address.service";
import {
    createAddressSchema,
    updateAddressSchema,
} from "../validators/address.validator";

export const getAddresses = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.user;

        const addresses = await addressService.getAddresses(userId);

        return res.status(200).json({
            success: true,
            data: addresses,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const createAddress = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.user;

        const body = createAddressSchema.parse(req.body);

        const address = await addressService.createAddress(userId, body);

        return res.status(201).json({
            success: true,
            message: "Address added successfully.",
            data: address,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateAddress = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.user;

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid address id.",
            });
        }

        const body = updateAddressSchema.parse(req.body);

        const address = await addressService.updateAddress(
            id,
            userId,
            body
        );

        return res.status(200).json({
            success: true,
            message: "Address updated successfully.",
            data: address,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteAddress = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.user;

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid address id.",
            });
        }

        await addressService.deleteAddress(id, userId);

        return res.status(200).json({
            success: true,
            message: "Address deleted successfully.",
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const setDefaultAddress = async (
    req: Request,
    res: Response
) => {
    try {
        const { userId } = res.locals.user;

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid address id.",
            });
        }

        const address = await addressService.setDefaultAddress(
            id,
            userId
        );

        return res.status(200).json({
            success: true,
            message: "Default address updated.",
            data: address,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};