import type { Request, Response, NextFunction } from "express";
import { verifySession } from "../services/auth.service.js";

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.session as string | undefined;
        if (!token) {
            return res.status(401).json({ success: false, error: "Unauthorized" });
        }

        const user = await verifySession(token);
        if (!user) {
            return res.status(401).json({ success: false, error: "Unauthorized" });
        }

        req.user = user; // with only single field that is id
        next();
    } catch (err) {
        next(err);
    }
}
