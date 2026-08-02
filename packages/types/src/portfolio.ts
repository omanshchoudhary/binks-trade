export type HoldingPosition = {
    shareId: string;
    symbol: string;
    name: string;
    sector: string;
    quantity: number;
    avgBuyPrice: number;
    currentPrice: number;
    previousClose: number;
    investedValue: number;
    currentValue: number;
    unrealisedPnl: number;
    unrealisedPnlPercent: number;
    dayChange: number;
    dayChangePercent: number;
    allocationPercent: number;
    priceUpdatedAt: string;
};

export type PortfolioTotals = {
    cashBalance: number;
    availableCash: number;
    investedValue: number;
    holdingsValue: number;
    totalValue: number;
    unrealisedPnl: number;
    unrealisedPnlPercent: number;
    dayChange: number;
    dayChangePercent: number;
    cashPercent: number;
    investedPercent: number;
};

export type PortfolioSummary = {
    totals: PortfolioTotals;
    holdings: HoldingPosition[];
    asOf: string;
};
