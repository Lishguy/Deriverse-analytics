"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { Trade } from "@/lib/mockTrades";
import { calculateTradePnL } from "@/lib/calculations";

type Props = {
  trades: Trade[];
};

export default function PnlBarChart({ trades }: Props) {
  const data = trades.map((trade, index) => ({
    name: `Trade ${index + 1}`,
    pnl: calculateTradePnL(trade),
  }));

  return (
    <div className="w-full h-75 rounded-xl border p-4">
      <h2 className="mb-4 text-lg font-semibold">PnL per Trade</h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="pnl" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
