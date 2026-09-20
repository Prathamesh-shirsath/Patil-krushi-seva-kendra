import { Request, Response } from "express";

import * as deliveryPincodeService from "../services/delivery-pincode.service";

export const getDeliveryPincodes = async (
    _req: Request,
    res: Response
) => {
    try {
        const pincodes =
            await deliveryPincodeService.getDeliveryPincodes();

        return res.status(200).json({
            success: true,
            data: pincodes,
        });
    } catch (error) {
        console.error(
            "Get delivery pincodes error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch delivery pincodes.",
        });
    }
};

export const createDeliveryPincode = async (
    req: Request,
    res: Response
) => {
    try {
        const { pincode } = req.body;

        if (!pincode) {
            return res.status(400).json({
                success: false,
                message: "Pincode is required.",
            });
        }

        const deliveryPincode =
            await deliveryPincodeService.createDeliveryPincode(
                pincode
            );

        return res.status(201).json({
            success: true,
            message:
                "Delivery pincode added successfully.",
            data: deliveryPincode,
        });
    } catch (error: any) {
        console.error(
            "Create delivery pincode error:",
            error
        );

        return res.status(400).json({
            success: false,
            message:
                error?.message ||
                "Failed to add delivery pincode.",
        });
    }
};

export const updateDeliveryPincode = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Pincode ID is required.",
            });
        }

        const {
            pincode,
            isActive,
        } = req.body;

        const updated =
            await deliveryPincodeService.updateDeliveryPincode(
                id,
                {
                    pincode,
                    isActive,
                }
            );

        return res.status(200).json({
            success: true,
            message:
                "Delivery pincode updated successfully.",
            data: updated,
        });
    } catch (error: any) {
        console.error(
            "Update delivery pincode error:",
            error
        );

        return res.status(400).json({
            success: false,
            message:
                error?.message ||
                "Failed to update delivery pincode.",
        });
    }
};

export const deleteDeliveryPincode = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Pincode ID is required.",
            });
        }

        await deliveryPincodeService.deleteDeliveryPincode(
            id
        );

        return res.status(200).json({
            success: true,
            message:
                "Delivery pincode deleted successfully.",
        });
    } catch (error: any) {
        console.error(
            "Delete delivery pincode error:",
            error
        );

        return res.status(400).json({
            success: false,
            message:
                error?.message ||
                "Failed to delete delivery pincode.",
        });
    }
};

export const checkDeliveryPincode = async (
    req: Request,
    res: Response
) => {
    try {
        const pincode = Array.isArray(
            req.params.pincode
        )
            ? req.params.pincode[0]
            : req.params.pincode;

        if (!pincode) {
            return res.status(400).json({
                success: false,
                message: "Pincode is required.",
            });
        }

        const available =
            await deliveryPincodeService.isDeliveryAvailable(
                pincode
            );

        return res.status(200).json({
            success: true,
            data: {
                pincode,
                available,
            },
        });
    } catch (error) {
        console.error(
            "Check delivery pincode error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to check delivery availability.",
        });
    }
};