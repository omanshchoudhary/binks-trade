import { prisma } from "@binks/db";
import type { Order } from "@binks/types";

export async function listOrdersForUser(userId: string): Promise<Order[]> {
    const orders = await prisma.order.findMany({
        where: { userId },
        include: {
            share: { select: { symbol: true, name: true } },
        },
        orderBy: { createdAt: "desc" },
    });

    return orders.map((order) => ({
        id: order.id,
        shareId: order.shareId,
        symbol: order.share.symbol,
        name: order.share.name,
        type: order.type,
        quantity: order.quantity,
        price: Number(order.price),
        executedPrice:
            order.executedPrice === null ? null : Number(order.executedPrice),
        status: order.status,
        createdAt: order.createdAt.toISOString(),
        executedAt: order.executedAt?.toISOString() ?? null,
    }));
}
