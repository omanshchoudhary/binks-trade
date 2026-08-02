export type MarketIndex = {
    symbol: string;
    name: string;
    value: number;
    previousClose: number;
    changePercent: number;
    priceUpdatedAt: string;
};

export type MarketStatus = {
    open: boolean;
    nextOpen: string | null;
    nextClose: string | null;
    asOf: string;
};

export type WatchlistItem = {
    id: string;
    shareId: string;
    symbol: string;
    name: string;
    sector: string;
    price: number;
    changePercent: number;
    note: string | null;
    createdAt: string;
};
