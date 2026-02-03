"use client";

import React from "react";

type FilterBarProps = {
  symbolFilter: string;
  setSymbolFilter: (value: string) => void;
  marketFilter: string;
  setMarketFilter: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
};

const symbols = ["all", "SOL-PERP", "BTC-PERP"];
const markets = ["all", "spot", "perp", "options"];

export default function FilterBar({
  symbolFilter,
  setSymbolFilter,
  marketFilter,
  setMarketFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Symbol Filter */}
      <select
        value={symbolFilter}
        onChange={(e) => setSymbolFilter(e.target.value)}
        className="border rounded p-2"
      >
        {symbols.map((s) => (
          <option key={s} value={s}>
            {s === "all" ? "All Symbols" : s}
          </option>
        ))}
      </select>

      {/* Market Filter */}
      <select
        value={marketFilter}
        onChange={(e) => setMarketFilter(e.target.value)}
        className="border rounded p-2"
      >
        {markets.map((m) => (
          <option key={m} value={m}>
            {m === "all" ? "All Markets" : m}
          </option>
        ))}
      </select>

      {/* Start Date */}
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border rounded p-2"
      />

      {/* End Date */}
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border rounded p-2"
      />
    </div>
  );
}
