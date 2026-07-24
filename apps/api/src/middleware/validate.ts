import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

export function validate<T>(schema: ZodType<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: "Validation failed",
                details: result.error.flatten(),
            });
        }
        req.body = result.data; // validated & typed data
        next();
    }
}
