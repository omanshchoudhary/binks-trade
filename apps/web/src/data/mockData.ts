export interface Stock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
}

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

export const topGainers: Stock[] = [
  { symbol: "TATAMOTORS", name: "Tata Motors", price: 985.4, changePercent: 4.18 },
  { symbol: "ADANIPORTS", name: "Adani Ports", price: 1432.1, changePercent: 3.62 },
  { symbol: "INFY", name: "Infosys", price: 1678.25, changePercent: 2.94 },
];

export const topLosers: Stock[] = [
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1512.7, changePercent: -2.13 },
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2945.6, changePercent: -1.42 },
  { symbol: "SBIN", name: "State Bank of India", price: 820.15, changePercent: -1.08 },
];

export const trending: Stock[] = [
  { symbol: "TCS", name: "Tata Consultancy", price: 4102.3, changePercent: 0.82 },
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2945.6, changePercent: -1.42 },
  { symbol: "ICICIBANK", name: "ICICI Bank", price: 1205.45, changePercent: 1.21 },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 1498.9, changePercent: 1.94 },
  { symbol: "WIPRO", name: "Wipro", price: 565.8, changePercent: -0.63 },
  { symbol: "LT", name: "Larsen & Toubro", price: 3640.0, changePercent: 0.51 },
];
