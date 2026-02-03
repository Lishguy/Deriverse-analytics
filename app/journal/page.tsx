"use client";

import { mockTrades, Trade } from "@/lib/mockTrades";
import TradeTable from "@/components/tables/TradeTable";

export default function JournalPage() {
  // No need for setTrades yet
  const trades: Trade[] = mockTrades;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Trading Journal</h1>
      <p className="text-sm text-muted-foreground">
        View all trades with entry/exit, size, PnL, and add notes for each trade.
      </p>

      <TradeTable trades={trades} />
    </div>
  );
}
