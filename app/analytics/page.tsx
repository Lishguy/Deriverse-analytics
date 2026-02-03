"use client";

import { useState, useMemo } from "react";
import { mockTrades } from "@/lib/mockTrades";
import {
  calculateTotalPnL,
  calculateWinRate,
  calculateAvgWinLoss,
  calculateDirectionBias,
  buildEquityData,
  buildDrawdownData,
  calculateMaxDrawdown,
} from "@/lib/calculations";

import PnlBarChart from "@/components/charts/PnLBarChart";
import DirectionBiasChart from "@/components/charts/DirectionBiasChart";
import EquityCurve from "@/components/charts/EquityCurve";
import DrawdownChart from "@/components/charts/DrawdownChart";
import FilterBar from "@/components/ui/FilterBar";
import StatCard from "@/components/ui/StatCard";

export default function AnalyticsPage() {
  // Filters
  const [symbolFilter, setSymbolFilter] = useState("all");
  const [marketFilter, setMarketFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Filter trades
  const filteredTrades = useMemo(() => {
    return mockTrades.filter((trade) => {
      const matchSymbol = symbolFilter === "all" || trade.symbol === symbolFilter;
      const matchMarket = marketFilter === "all" || trade.market === marketFilter;
      const tradeDate = new Date(trade.openedAt);
      const matchStart = !startDate || tradeDate >= new Date(startDate);
      const matchEnd = !endDate || tradeDate <= new Date(endDate);
      return matchSymbol && matchMarket && matchStart && matchEnd;
    });
  }, [symbolFilter, marketFilter, startDate, endDate]);

  // Stats
  const totalPnL = calculateTotalPnL(filteredTrades);
  const winRate = calculateWinRate(filteredTrades);
  const { avgWin, avgLoss } = calculateAvgWinLoss(filteredTrades);
  const { longCount, shortCount } = calculateDirectionBias(filteredTrades);

  // Charts
  const equityCurve = buildEquityData(filteredTrades);
  const equityValues = equityCurve.map((p) => p.equity);
  const maxDrawdown = calculateMaxDrawdown(equityValues);

  const directionData = [
    { name: "Long", value: longCount },
    { name: "Short", value: shortCount },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Filters */}
      <FilterBar
        symbolFilter={symbolFilter}
        setSymbolFilter={setSymbolFilter}
        marketFilter={marketFilter}
        setMarketFilter={setMarketFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total PnL" value={totalPnL.toFixed(2)} />
        <StatCard label="Win Rate" value={`${winRate.toFixed(2)}%`} />
        <StatCard label="Avg Win" value={avgWin.toFixed(2)} />
        <StatCard label="Avg Loss" value={avgLoss.toFixed(2)} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PnlBarChart trades={filteredTrades} />
        <DirectionBiasChart data={directionData} />
        <EquityCurve data={equityCurve} />
        <DrawdownChart data={buildDrawdownData(equityCurve)} />
      </div>

      <p className="text-sm text-muted-foreground">
        Max Drawdown: {maxDrawdown.toFixed(2)}
      </p>
    </div>
  );
}
