"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: { name: string; value: number }[];
};

export default function DirectionBiasChart({ data }: Props) {
  return (
    <div className="bg-neutral-900 p-4 rounded-xl h-72">
      <h3 className="text-sm text-neutral-400 mb-2">
        Long vs Short Ratio
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
