import "dotenv/config";
import { prisma } from "../src/index.js";

const shares = [
  { symbol: "RELIANCE", name: "Reliance Industries", sector: "Energy", currentPrice: 2950, week52High: 3217, week52Low: 2400 },
  { symbol: "TCS", name: "Tata Consultancy Services", sector: "IT", currentPrice: 3900, week52High: 4254, week52Low: 3311 },
  { symbol: "HDFCBANK", name: "HDFC Bank", sector: "Banking", currentPrice: 1680, week52High: 1791, week52Low: 1363 },
  { symbol: "ICICIBANK", name: "ICICI Bank", sector: "Banking", currentPrice: 1150, week52High: 1257, week52Low: 902 },
  { symbol: "INFY", name: "Infosys", sector: "IT", currentPrice: 1650, week52High: 1902, week52Low: 1351 },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever", sector: "FMCG", currentPrice: 2450, week52High: 2769, week52Low: 2172 },
  { symbol: "ITC", name: "ITC", sector: "FMCG", currentPrice: 435, week52High: 499, week52Low: 390 },
  { symbol: "SBIN", name: "State Bank of India", sector: "Banking", currentPrice: 820, week52High: 912, week52Low: 600 },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", sector: "Telecom", currentPrice: 1420, week52High: 1548, week52Low: 1010 },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", sector: "Banking", currentPrice: 1780, week52High: 1953, week52Low: 1544 },
  { symbol: "LT", name: "Larsen & Toubro", sector: "Infrastructure", currentPrice: 3600, week52High: 3963, week52Low: 3000 },
  { symbol: "AXISBANK", name: "Axis Bank", sector: "Banking", currentPrice: 1180, week52High: 1340, week52Low: 970 },
  { symbol: "BAJFINANCE", name: "Bajaj Finance", sector: "Finance", currentPrice: 7200, week52High: 8190, week52Low: 6188 },
  { symbol: "ASIANPAINT", name: "Asian Paints", sector: "Consumer", currentPrice: 2900, week52High: 3568, week52Low: 2670 },
  { symbol: "MARUTI", name: "Maruti Suzuki India", sector: "Automobile", currentPrice: 12500, week52High: 13680, week52Low: 9738 },
  { symbol: "SUNPHARMA", name: "Sun Pharmaceutical", sector: "Pharma", currentPrice: 1700, week52High: 1960, week52Low: 1300 },
  { symbol: "TITAN", name: "Titan Company", sector: "Consumer", currentPrice: 3400, week52High: 3886, week52Low: 3055 },
  { symbol: "ULTRACEMCO", name: "UltraTech Cement", sector: "Cement", currentPrice: 11200, week52High: 12137, week52Low: 8700 },
  { symbol: "WIPRO", name: "Wipro", sector: "IT", currentPrice: 530, week52High: 584, week52Low: 401 },
  { symbol: "NESTLEIND", name: "Nestle India", sector: "FMCG", currentPrice: 2480, week52High: 2778, week52Low: 2205 },
  { symbol: "TATAMOTORS", name: "Tata Motors", sector: "Automobile", currentPrice: 980, week52High: 1179, week52Low: 760 },
  { symbol: "HCLTECH", name: "HCL Technologies", sector: "IT", currentPrice: 1620, week52High: 1807, week52Low: 1235 },
  { symbol: "POWERGRID", name: "Power Grid Corporation", sector: "Energy", currentPrice: 330, week52High: 366, week52Low: 250 },
  { symbol: "NTPC", name: "NTPC", sector: "Energy", currentPrice: 370, week52High: 448, week52Low: 290 },
  { symbol: "TATASTEEL", name: "Tata Steel", sector: "Metals", currentPrice: 150, week52High: 175, week52Low: 122 },
  { symbol: "M&M", name: "Mahindra & Mahindra", sector: "Automobile", currentPrice: 2850, week52High: 3222, week52Low: 1900 },
  { symbol: "ADANIENT", name: "Adani Enterprises", sector: "Conglomerate", currentPrice: 3100, week52High: 3743, week52Low: 2200 },
  { symbol: "ADANIPORTS", name: "Adani Ports & SEZ", sector: "Infrastructure", currentPrice: 1450, week52High: 1621, week52Low: 1000 },
  { symbol: "BAJAJFINSV", name: "Bajaj Finserv", sector: "Finance", currentPrice: 1650, week52High: 2005, week52Low: 1430 },
  { symbol: "ONGC", name: "Oil & Natural Gas Corporation", sector: "Energy", currentPrice: 270, week52High: 345, week52Low: 220 },
  { symbol: "COALINDIA", name: "Coal India", sector: "Energy", currentPrice: 460, week52High: 543, week52Low: 360 },
  { symbol: "JSWSTEEL", name: "JSW Steel", sector: "Metals", currentPrice: 920, week52High: 1050, week52Low: 780 },
  { symbol: "GRASIM", name: "Grasim Industries", sector: "Cement", currentPrice: 2550, week52High: 2855, week52Low: 1900 },
  { symbol: "HINDALCO", name: "Hindalco Industries", sector: "Metals", currentPrice: 640, week52High: 772, week52Low: 520 },
  { symbol: "TECHM", name: "Tech Mahindra", sector: "IT", currentPrice: 1580, week52High: 1807, week52Low: 1150 },
  { symbol: "INDUSINDBK", name: "IndusInd Bank", sector: "Banking", currentPrice: 980, week52High: 1550, week52Low: 930 },
  { symbol: "DRREDDY", name: "Dr. Reddy's Laboratories", sector: "Pharma", currentPrice: 1300, week52High: 1421, week52Low: 1100 },
  { symbol: "CIPLA", name: "Cipla", sector: "Pharma", currentPrice: 1520, week52High: 1702, week52Low: 1300 },
  { symbol: "BRITANNIA", name: "Britannia Industries", sector: "FMCG", currentPrice: 5200, week52High: 5803, week52Low: 4641 },
  { symbol: "EICHERMOT", name: "Eicher Motors", sector: "Automobile", currentPrice: 4800, week52High: 5210, week52Low: 3700 },
  { symbol: "BAJAJ-AUTO", name: "Bajaj Auto", sector: "Automobile", currentPrice: 9200, week52High: 12200, week52Low: 7500 },
  { symbol: "HEROMOTOCO", name: "Hero MotoCorp", sector: "Automobile", currentPrice: 4600, week52High: 6246, week52Low: 4000 },
  { symbol: "DIVISLAB", name: "Divi's Laboratories", sector: "Pharma", currentPrice: 5600, week52High: 6135, week52Low: 3500 },
  { symbol: "APOLLOHOSP", name: "Apollo Hospitals", sector: "Healthcare", currentPrice: 6800, week52High: 7545, week52Low: 5800 },
  { symbol: "HDFCLIFE", name: "HDFC Life Insurance", sector: "Insurance", currentPrice: 620, week52High: 761, week52Low: 511 },
  { symbol: "SBILIFE", name: "SBI Life Insurance", sector: "Insurance", currentPrice: 1500, week52High: 1936, week52Low: 1320 },
  { symbol: "TATACONSUM", name: "Tata Consumer Products", sector: "FMCG", currentPrice: 1080, week52High: 1254, week52Low: 880 },
  { symbol: "LTIM", name: "LTIMindtree", sector: "IT", currentPrice: 5400, week52High: 6766, week52Low: 4600 },
  { symbol: "VEDL", name: "Vedanta", sector: "Metals", currentPrice: 440, week52High: 513, week52Low: 250 },
  { symbol: "BPCL", name: "Bharat Petroleum", sector: "Energy", currentPrice: 300, week52High: 376, week52Low: 230 },
];

async function main() {
  const now = new Date();
  const result = await prisma.share.createMany({
    data: shares.map((share) => ({ ...share, priceUpdatedAt: now })),
    skipDuplicates: true,
  });
  const total = await prisma.share.count();
  console.log(`Inserted ${result.count} shares (skipped ${shares.length - result.count}). Total in DB: ${total}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
