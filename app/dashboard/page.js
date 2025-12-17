"use client";

import { useEffect, useMemo, useState } from "react";

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-bold mt-1">{value ?? "-"}</div>
    </div>
  );
}

function BarChart({ data, height = 160 }) {
  // data: [{ label, value }]
  const max = Math.max(1, ...data.map((d) => d.value));
  const barWidth = 80;
  const gap = 26;
  const width = data.length * barWidth + (data.length - 1) * gap + 40;

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="font-semibold mb-3">Diagram 1: Jadwal per Status</div>
      <svg width="100%" viewBox={`0 0 ${width} ${height + 50}`}>
        {/* axis */}
        <line x1="20" y1={height} x2={width - 20} y2={height} stroke="black" />
        <line x1="20" y1="10" x2="20" y2={height} stroke="black" />

        {data.map((d, i) => {
          const x = 40 + i * (barWidth + gap);
          const h = (d.value / max) * (height - 20);
          const y = height - h;

          return (
            <g key={d.label}>
              {/* bar */}
              <rect x={x} y={y} width={barWidth} height={h} fill="black" opacity="0.25" />
              {/* value */}
              <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fontSize="12">
                {d.value}
              </text>
              {/* label */}
              <text x={x + barWidth / 2} y={height + 18} textAnchor="middle" fontSize="12">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function DonutChart({ values, labels, size = 180, stroke = 26 }) {
  // simple donut with 2 segments (cukup untuk ADMIN vs KURIR)
  const total = values.reduce((a, b) => a + b, 0) || 1;
  const radius = (size - stroke) / 2;
  const c = 2 * Math.PI * radius;

  const a = (values[0] / total) * c;
  const b = (values[1] / total) * c;

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="font-semibold mb-3">Diagram 2: Komposisi User per Role</div>

      <div className="flex items-center gap-6">
        <svg width={size} height={size}>
          <g transform={`translate(${size / 2}, ${size / 2})`}>
            {/* background ring */}
            <circle r={radius} fill="none" stroke="black" opacity="0.08" strokeWidth={stroke} />
            {/* segment 1 */}
            <circle
              r={radius}
              fill="none"
              stroke="black"
              strokeWidth={stroke}
              strokeDasharray={`${a} ${c - a}`}
              strokeDashoffset="0"
              transform="rotate(-90)"
            />
            {/* segment 2 */}
            <circle
              r={radius}
              fill="none"
              stroke="black"
              opacity="0.35"
              strokeWidth={stroke}
              strokeDasharray={`${b} ${c - b}`}
              strokeDashoffset={-a}
              transform="rotate(-90)"
            />
            <text textAnchor="middle" fontSize="12" y="-2" fill="black">
              Total
            </text>
            <text textAnchor="middle" fontSize="18" y="18" fill="black">
              {values[0] + values[1]}
            </text>
          </g>
        </svg>

        <div className="text-sm space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-black opacity-100 rounded-sm"></span>
            <span>{labels[0]}: {values[0]}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-black opacity-35 rounded-sm"></span>
            <span>{labels[1]}: {values[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setErr("");
      const res = await fetch("/api/dashboard/stats", { cache: "no-store" });
      if (!res.ok) {
        setErr("Gagal ambil data dashboard");
        return;
      }
      const data = await res.json();
      setStats(data);
    })();
  }, []);

  const barData = useMemo(() => {
    const m = stats?.statusMap || {};
    return [
      { label: "PICKUP", value: m.PICKUP || 0 },
      { label: "PROSES", value: m.PROSES || 0 },
      { label: "ANTAR", value: m.ANTAR || 0 },
    ];
  }, [stats]);

  const roleValues = useMemo(() => {
    const m = stats?.roleMap || {};
    return [m.ADMIN || 0, m.KURIR || 0];
  }, [stats]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl">Dashboard Kurir / Admin</h1>

      {err && <div className="text-red-600">{err}</div>}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard title="Jumlah Kurir Terdaftar" value={stats?.kurirCount} />
        <StatCard title="Jumlah Customer/Order yang Ingin Diantar (Belum Selesai)" value={stats?.pendingAntarCount} />
      </div>

      {/* Diagrams (2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BarChart data={barData} />
        <DonutChart values={roleValues} labels={["ADMIN", "KURIR"]} />
      </div>
    </div>
  );
}
