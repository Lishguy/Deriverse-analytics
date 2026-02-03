import { Trade } from "./mockTrades";

/* ======================================================
   CORE PnL & PERFORMANCE
====================================================== */

/** PnL per trade */
export function calculateTradePnL(trade: Trade): number {
  const priceDiff =
    trade.side === "long"
      ? trade.exitPrice - trade.entryPrice
      : trade.entryPrice - trade.exitPrice;

  return priceDiff * trade.size - trade.fee;
}

/** Total PnL */
export function calculateTotalPnL(trades: Trade[]): number {
  return trades.reduce((sum, t) => sum + calculateTradePnL(t), 0);
}

/** Win rate (%) */
export function calculateWinRate(trades: Trade[]): number {
  if (!trades.length) return 0;
  const wins = trades.filter(t => calculateTradePnL(t) > 0).length;
  return (wins / trades.length) * 100;
}

/* ======================================================
   RISK & DISTRIBUTION
====================================================== */

/** Average win & average loss */
export function calculateAvgWinLoss(trades: Trade[]) {
  const pnls = trades.map(calculateTradePnL);
  const wins = pnls.filter(p => p > 0);
  const losses = pnls.filter(p => p < 0);

  return {
    avgWin: wins.length
      ? wins.reduce((a, b) => a + b, 0) / wins.length
      : 0,
    avgLoss: losses.length
      ? losses.reduce((a, b) => a + b, 0) / losses.length
      : 0,
  };
}

/** Largest gain & largest loss */
export function calculateExtremes(trades: Trade[]) {
  if (!trades.length) {
    return { maxWin: 0, maxLoss: 0 };
  }

  const pnls = trades.map(calculateTradePnL);
  return {
    maxWin: Math.max(...pnls),
    maxLoss: Math.min(...pnls),
  };
}

/* ======================================================
   DIRECTIONAL & BEHAVIORAL METRICS
====================================================== */

/** Long vs Short count */
export function calculateDirectionBias(trades: Trade[]) {
  const longCount = trades.filter(t => t.side === "long").length;
  const shortCount = trades.filter(t => t.side === "short").length;

  return { longCount, shortCount };
}

/** Trade duration in minutes */
export function getTradeDuration(trade: Trade): number {
  const open = new Date(trade.openedAt).getTime();
  const close = new Date(trade.closedAt).getTime();
  return (close - open) / 60000;
}

/** Average trade duration */
export function calculateAvgDuration(trades: Trade[]): number {
  if (!trades.length) return 0;
  const durations = trades.map(getTradeDuration);
  return durations.reduce((a, b) => a + b, 0) / durations.length;
}

/* ======================================================
   EQUITY CURVE & DRAWDOWN (FOR CHARTS)
====================================================== */

/** Build equity curve data for charts */
export function buildEquityData(trades: Trade[]) {
  let equity = 0;

  return trades.map((trade, index) => {
    equity += calculateTradePnL(trade);

    return {
      index: index + 1,
      equity,
    };
  });
}

/** Build drawdown data from equity curve */
export function buildDrawdownData(
  equityData: { index: number; equity: number }[]
) {
  if (!equityData.length) return [];

  let peak = equityData[0].equity;

  return equityData.map(point => {
    if (point.equity > peak) peak = point.equity;

    return {
      index: point.index,
      drawdown: peak - point.equity,
    };
  });
}

/** Maximum drawdown value */
export function calculateMaxDrawdown(equityCurve: number[]): number {
  if (!equityCurve.length) return 0;

  let peak = equityCurve[0];
  let maxDrawdown = 0;

  for (const value of equityCurve) {
    if (value > peak) peak = value;
    const drawdown = peak - value;
    if (drawdown > maxDrawdown) maxDrawdown = drawdown;
  }

  return maxDrawdown;
}
