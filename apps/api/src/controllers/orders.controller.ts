import type { Request, Response } from "express";
import { listOrdersForUser } from "../services/orders.service.js";

export async function getOrders(req: Request, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized",
        });
    }

    const orders = await listOrdersForUser(userId);

    return res.status(200).json({
        success: true,
        data: orders,
    });
}
