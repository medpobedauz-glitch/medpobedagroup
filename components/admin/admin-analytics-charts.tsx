"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card } from "@/components/ui/card";

type TrendItem = {
  label: string;
  total: number;
  partnership: number;
  medicalTourism: number;
  studentMobility: number;
  contact: number;
};

type CountryItem = {
  name: string;
  value: number;
};

const colors = ["#22d3ee", "#1d4ed8", "#0ea5e9", "#38bdf8", "#0f766e", "#93c5fd"];

export function AdminAnalyticsCharts({
  trends,
  countries,
}: {
  trends: TrendItem[];
  countries: CountryItem[];
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <Card variant="dashboard" className="rounded-[1.8rem] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
          Inquiry Trends
        </p>
        <h2 className="mt-4 font-display text-2xl font-semibold text-white">
          Six-month lead momentum
        </h2>
        <div className="mt-6 h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trends}>
              <defs>
                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.06} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis dataKey="label" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "rgba(7,18,38,0.96)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "16px",
                  color: "#e2e8f0",
                }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#22d3ee"
                fill="url(#totalGradient)"
                strokeWidth={3}
              />
              <Area
                type="monotone"
                dataKey="medicalTourism"
                stroke="#93c5fd"
                fill="transparent"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card variant="dashboard" className="rounded-[1.8rem] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-100/70">
          Country Mix
        </p>
        <h2 className="mt-4 font-display text-2xl font-semibold text-white">
          Lead source geography
        </h2>
        <div className="mt-4 h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={countries}
                dataKey="value"
                nameKey="name"
                innerRadius={66}
                outerRadius={106}
                paddingAngle={3}
              >
                {countries.map((entry, index) => (
                  <Cell
                    key={`${entry.name}-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "rgba(7,18,38,0.96)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "16px",
                  color: "#e2e8f0",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 grid gap-3">
          {countries.map((country, index) => (
            <div
              key={country.name}
              className="flex items-center justify-between rounded-[1.2rem] border border-white/8 bg-slate-950/26 px-4 py-3 text-sm text-slate-200"
            >
              <span className="inline-flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                {country.name}
              </span>
              <span>{country.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
