import { mockTrades } from "@/lib/mockTrades";
import Link from "next/link";
import {
  buildEquityData,
  buildDrawdownData,
} from "@/lib/calculations";
import EquityCurve from "@/components/charts/EquityCurve";
import DrawdownChart from "@/components/charts/DrawdownChart";
import DirectionBiasChart from "@/components/charts/DirectionBiasChart";
import PnlBarChart from "@/components/charts/PnLBarChart"


export default function DashboardPage() {
  const equityData = buildEquityData(mockTrades);
  const drawdownData = buildDrawdownData(equityData);

  const directionData = [
    {
      name: "Long",
      value: mockTrades.filter(t => t.side === "long").length,
    },
    {
      name: "Short",
      value: mockTrades.filter(t => t.side === "short").length,
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Portfolio Dashboard
        </h1>
        <div className="flex gap-4">
        <Link
          href="/analytics"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Portfolio Analysis
        </Link>
        <Link
          href="/journal"
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Trading Journal
        </Link>
      </div>
        
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EquityCurve data={equityData} />
        <DrawdownChart data={drawdownData} />
        <DirectionBiasChart data={directionData} />
        <PnlBarChart trades={mockTrades} />
      </div>

      
    </section>
  );
}
