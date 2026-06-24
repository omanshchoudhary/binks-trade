import type { Request, Response, NextFunction } from "express";
import { fetchAllShares } from "../services/shares.service.js";

export async function getAllShares(_req: Request, res: Response, next: NextFunction) {
    try {
        const shares = await fetchAllShares();

        return res.status(200).json({
            success: true,
            data: shares.map((share) => ({
                ...share,
                changePercent:
                    ((Number(share.currentPrice) - Number(share.previousClose)) / Number(share.previousClose)) * 100
            }))
        })
    } catch (err) {
        next(err);
    }
}
