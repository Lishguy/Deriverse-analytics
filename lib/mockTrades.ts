export type Trade = {
  id: string;
  symbol: string;
  market: "spot" | "perp" | "options";
  side: "long" | "short";
  entryPrice: number;
  exitPrice: number;
  size: number;
  fee: number;
  orderType: "market" | "limit";
  openedAt: string;
  closedAt: string;
};

export const mockTrades: Trade[] = [
  {
    id: "1",
    symbol: "SOL-PERP",
    market: "perp",
    side: "long",
    entryPrice: 95,
    exitPrice: 108,
    size: 10,
    fee: 1.2,
    orderType: "market",
    openedAt: "2026-01-28T09:00:00Z",
    closedAt: "2026-01-28T11:30:00Z",
  },
  {
    id: "2",
    symbol: "BTC-PERP",
    market: "perp",
    side: "short",
    entryPrice: 43800,
    exitPrice: 42900,
    size: 0.05,
    fee: 2.1,
    orderType: "limit",
    openedAt: "2026-01-29T14:10:00Z",
    closedAt: "2026-01-29T16:40:00Z",
  },
];
