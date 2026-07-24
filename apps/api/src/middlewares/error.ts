import type { Request, Response, NextFunction } from "express";
import { Prisma } from "@binks/db";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            const target = err.meta?.target;
            const fields = Array.isArray(target) ? target.join(", ") : "value";

            return res.status(409).json({
                success: false,
                error: `${fields} already in use`,
            });
        }

        if (err.code === "P2025") {
            return res.status(404).json({
                success: false,
                error: "Resource not found",
            });
        }
    }

    console.error(err);

    return res.status(500).json({
        success: false,
        error: "Internal server error",
    });
}

export function notFound(_req: Request, res: Response) {
    return res.status(404).json({
        success: false,
        error: "Route not found",
    });
}
