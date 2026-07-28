import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import * as addressController from "../controllers/address.controller";

const router = Router();

router.use(authenticate);

router.get("/", addressController.getAddresses);

router.post("/", addressController.createAddress);

router.put("/:id", addressController.updateAddress);

router.delete("/:id", addressController.deleteAddress);

router.patch("/:id/default", addressController.setDefaultAddress);

export default router;