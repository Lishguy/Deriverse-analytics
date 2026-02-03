import { mockTrades } from "@/lib/mockTrades";
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
      <h1 className="text-2xl font-semibold">
        Portfolio Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EquityCurve data={equityData} />
        <DrawdownChart data={drawdownData} />
        <DirectionBiasChart data={directionData} />
        <PnlBarChart trades={mockTrades} />
      </div>
    </section>
  );
}
