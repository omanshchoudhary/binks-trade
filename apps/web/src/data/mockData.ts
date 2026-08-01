export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  changePercent: number;
}

export const balance = 100000;

export const indices: MarketIndex[] = [
  { symbol: "NIFTY50", name: "NIFTY 50", value: 22150.3, changePercent: 0.52 },
  { symbol: "SENSEX", name: "SENSEX", value: 73012.4, changePercent: 0.41 },
  { symbol: "BANKNIFTY", name: "NIFTY BANK", value: 47820.15, changePercent: -0.23 },
  { symbol: "NIFTYIT", name: "NIFTY IT", value: 34210.85, changePercent: 1.12 },
];
