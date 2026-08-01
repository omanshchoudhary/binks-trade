import type { Request, Response } from "express";
import { fetchAllShares } from "../services/shares.service.js";

export async function getAllShares(_req: Request, res: Response) {
    const shares = await fetchAllShares();

    return res.status(200).json({
        success: true,
        data: shares,
    });
}
