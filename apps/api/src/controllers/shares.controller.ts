import type { Request, Response, NextFunction } from "express";
import { fetchAllShares } from "../services/shares.service.js";

export async function getAllShares(_req: Request, res: Response, next: NextFunction) {
    try {
        const shares = await fetchAllShares();

        return res.status(200).json({
            success: true,
            data: shares
        })
    } catch (err) {
        next(err);
    }

}