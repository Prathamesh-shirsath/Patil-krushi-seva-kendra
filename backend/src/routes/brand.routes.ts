import { Router } from "express";

import {
    createBrandController,
    getAllBrandsController,
    updateBrandController,
    deleteBrandController,
} from "../controllers/brand.controller";

import { upload }
    from "../middleware/upload.middleware";

const router = Router();

router.post(
    "/",
    upload.single("logo"),
    createBrandController
);

router.get(
    "/",
    getAllBrandsController
);

router.put(
    "/:id",
    upload.single("logo"),
    updateBrandController
);

router.delete(
    "/:id",
    deleteBrandController
);



export default router;