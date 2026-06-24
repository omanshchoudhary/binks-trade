import { prisma } from "@binks/db";

export async function fetchAllShares() {
    return prisma.share.findMany();
}