import { Router } from "express";
import {
  createProductController,
  getAllProductsController,
  getProductBySlugController,
  updateProductController,
deleteProductController,
} from "../controllers/product.controller";

const router = Router();

router.post("/", createProductController);

router.get("/", getAllProductsController);

router.get("/:slug", getProductBySlugController);

export default router;

router.post("/", createProductController);

router.put("/:id", updateProductController);

router.delete("/:id", deleteProductController);

router.get("/", getAllProductsController);

router.get("/:slug", getProductBySlugController);