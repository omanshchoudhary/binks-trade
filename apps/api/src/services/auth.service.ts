import { prisma } from "@binks/db";
import type { SignupInput, LoginInput } from "@binks/types";
import argon2 from "argon2";
import crypto from "node:crypto";


const SESSION_DAYS = 7;

export async function createUser(input: SignupInput) {
    const passwordHash = await argon2.hash(input.password);

    const user = await prisma.user.create({
        data: {
            name: input.name,
            username: input.username,
            email: input.email,
            passwordHash,
            portfolio: {
                create: { cashBalance: 100000 }, // optional starter cash
            },
        },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            createdAt: true,
            // never select passwordHash
        },
    });
    return user;
}


export async function getUserById(id: string) {
    return prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            createdAt: true,
        },
    });
}

export async function verifyCredentials(input: LoginInput) {
    const user = await prisma.user.findUnique({
        where: { email: input.email },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            createdAt: true,
            passwordHash: true,
        },
    })

    if (!user?.passwordHash) return null;

    const ok = await argon2.verify(user.passwordHash, input.password);
    if (!ok) return null;

    const { passwordHash: _, ...safeUser } = user;
    return safeUser; // without passwordHash
}

export async function createSession(userId: string) {
    const token = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date(
        Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
    );
    await prisma.session.create({
        data: {
            userId,
            tokenHash,  
            expiresAt,
        },
    });
    return token;
}

export async function verifySession(token: string) {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const session = await prisma.session.findUnique({
        where: { tokenHash },
        select: { userId: true, expiresAt: true, revokedAt: true },
    });

    if (!session) return null;
    if (session.revokedAt) return null;
    if (session.expiresAt <= new Date()) return null;

    return { id: session.userId };
}

export async function revokeSession(token: string) {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    await prisma.session.updateMany({
        where: { tokenHash, revokedAt: null },
        data: { revokedAt: new Date() },
    });
}
