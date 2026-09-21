import { Router } from "express";

import {
    checkDeliveryPincode,
    createDeliveryPincode,
    deleteDeliveryPincode,
    getDeliveryPincodes,
    updateDeliveryPincode,
} from "../controllers/delivery-pincode.controller";

import { adminMiddleware } from "../middleware/admin.middleware";

const adminRouter = Router();

/**
 * ADMIN DELIVERY PINCODES
 *
 * Mounted from app.ts:
 * /api/admin/delivery-pincodes
 */

adminRouter.get(
    "/",
    adminMiddleware,
    getDeliveryPincodes
);

adminRouter.post(
    "/",
    adminMiddleware,
    createDeliveryPincode
);

adminRouter.patch(
    "/:id",
    adminMiddleware,
    updateDeliveryPincode
);

adminRouter.delete(
    "/:id",
    adminMiddleware,
    deleteDeliveryPincode
);


/**
 * PUBLIC DELIVERY PINCODE CHECK
 *
 * Mounted from app.ts:
 * /api/delivery-pincodes
 */

const publicRouter = Router();

publicRouter.get(
    "/check/:pincode",
    checkDeliveryPincode
);

export {
    adminRouter as deliveryPincodeAdminRoutes,
    publicRouter as deliveryPincodePublicRoutes,
};