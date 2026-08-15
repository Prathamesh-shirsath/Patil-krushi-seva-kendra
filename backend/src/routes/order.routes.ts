import { Router } from "express";

import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderStatusController,
} from "../controllers/order.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| CREATE ORDER
|--------------------------------------------------------------------------
|
| POST /api/orders
|
*/

router.post(
  "/",
  createOrderController
);

/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL ORDERS
|--------------------------------------------------------------------------
|
| GET /api/orders
|
*/

router.get(
  "/",
  getAllOrdersController
);

/*
|--------------------------------------------------------------------------
| GET SINGLE ORDER
|--------------------------------------------------------------------------
|
| GET /api/orders/:id
|
*/

router.get(
  "/:id",
  getOrderByIdController
);

/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE ORDER STATUS
|--------------------------------------------------------------------------
|
| PUT /api/orders/:id/status
|
| Body:
|
| {
|   "status": "CONFIRMED"
| }
|
*/

router.put(
  "/:id/status",
  updateOrderStatusController
);

export default router;