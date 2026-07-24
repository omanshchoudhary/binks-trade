import type { SignupInput, LoginInput } from "@binks/types";
import type { Request, Response } from "express";
import { createSession, createUser, revokeSession, verifyCredentials } from "../services/auth.service.js";

export async function signup(req: Request, res: Response) {
    const data = req.body as SignupInput;
    const user = await createUser(data);

    const token = await createSession(user.id);

    res.cookie("session", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
        success: true,
        data: user, // must not include passwordHash
    });
}

export async function login(req: Request, res: Response) {
    const data = req.body as LoginInput;
    const user = await verifyCredentials(data);

    if (!user) {
        return res.status(401).json({
            success: false,
            error: "Invalid email or password",
        });
    }
    const token = await createSession(user.id);

    res.cookie("session", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
        success: true,
        data: user,
    });
}

export async function logout(req: Request, res: Response) {
    const token = req.cookies.session as string | undefined;

    if (token) {
        await revokeSession(token);
    }

    res.clearCookie("session", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ success: true });
}
