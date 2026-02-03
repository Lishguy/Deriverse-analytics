"use client";

import { useState } from "react";
import { Trade } from "@/lib/mockTrades";
import { calculateTradePnL } from "@/lib/calculations";

type Props = {
  trades: Trade[];
};

export default function TradeTable({ trades }: Props) {
  const [notes, setNotes] = useState<{ [key: string]: string }>({});

  const handleNoteChange = (id: string, value: string) => {
    setNotes((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="overflow-x-auto rounded-xl border p-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Symbol</th>
            <th className="border p-2">Market</th>
            <th className="border p-2">Side</th>
            <th className="border p-2">Entry</th>
            <th className="border p-2">Exit</th>
            <th className="border p-2">Size</th>
            <th className="border p-2">Fee</th>
            <th className="border p-2">PnL</th>
            <th className="border p-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((t) => {
            const pnl = calculateTradePnL(t);
            const isWin = pnl > 0;
            return (
              <tr
                key={t.id}
                className={isWin ? "bg-green-50" : "bg-red-50"}
              >
                <td className="border p-2">{t.id}</td>
                <td className="border p-2">{t.symbol}</td>
                <td className="border p-2">{t.market}</td>
                <td className="border p-2">{t.side}</td>
                <td className="border p-2">{t.entryPrice}</td>
                <td className="border p-2">{t.exitPrice}</td>
                <td className="border p-2">{t.size}</td>
                <td className="border p-2">{t.fee}</td>
                <td className="border p-2 font-semibold">
                  {pnl.toFixed(2)}
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={notes[t.id] || ""}
                    onChange={(e) => handleNoteChange(t.id, e.target.value)}
                    placeholder="Add note..."
                    className="w-full rounded border p-1 text-sm"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
