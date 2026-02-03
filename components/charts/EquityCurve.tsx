"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type EquityPoint = {
  index: number;
  equity: number;
};

type Props = {
  data: EquityPoint[];
};

export default function EquityCurve({ data }: Props) {
  return (
    <div className="w-full h-80 rounded-xl border p-4">
      <h2 className="mb-4 text-lg font-semibold">Equity Curve</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="index" label={{ value: "Trade #", position: "insideBottom", offset: -5 }} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="equity" stroke="#3b82f6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
