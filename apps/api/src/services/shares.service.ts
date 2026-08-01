import { prisma } from "@binks/db";
import type { Share } from "@binks/types";

export async function fetchAllShares(): Promise<Share[]> {
    const shares = await prisma.share.findMany({
        orderBy: { symbol: "asc" },
    });

    return shares.map((share) => {
        const price = Number(share.currentPrice);
        const previousClose = Number(share.previousClose);

        return {
            id: share.id,
            symbol: share.symbol,
            name: share.name,
            sector: share.sector,
            price,
            previousClose,
            week52High: Number(share.week52High),
            week52Low: Number(share.week52Low),
            changePercent:
                previousClose === 0
                    ? 0
                    : ((price - previousClose) / previousClose) * 100,
            priceUpdatedAt: share.priceUpdatedAt.toISOString(),
        };
    });
}
