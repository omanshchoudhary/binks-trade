import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { getOrders } from "../controllers/orders.controller.js";

const router = Router();

router.get("/", authenticate, getOrders);

export default router;
