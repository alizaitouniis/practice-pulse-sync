import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TrendData {
  month: string;
  charges: number;
  payments: number;
  adjustments: number;
}

const fmt = (n: number) => `$${(n / 1000).toFixed(0)}K`;

const RevenueTrendChart = ({ data }: { data: TrendData[] }) => (
  <div className="rounded-lg border border-border bg-card card-glow p-5 opacity-0 animate-fade-in" style={{ animationDelay: "450ms" }}>
    <h3 className="text-base font-semibold text-card-foreground">Revenue Trends</h3>
    <p className="text-sm text-muted-foreground mt-0.5 mb-4">Monthly charges, payments & adjustments</p>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
          <defs>
            <linearGradient id="gradCharges" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(215, 50%, 40%)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="hsl(215, 50%, 40%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradPayments" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(174, 60%, 40%)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="hsl(174, 60%, 40%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={fmt} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(value: number) => `$${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
          <Area type="monotone" dataKey="charges" stroke="hsl(215, 50%, 40%)" fill="url(#gradCharges)" strokeWidth={2} />
          <Area type="monotone" dataKey="payments" stroke="hsl(174, 60%, 40%)" fill="url(#gradPayments)" strokeWidth={2} />
          <Area type="monotone" dataKey="adjustments" stroke="hsl(38, 92%, 50%)" fill="transparent" strokeWidth={2} strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    <div className="flex items-center gap-5 mt-3">
      {[
        { label: "Charges", color: "hsl(215, 50%, 40%)" },
        { label: "Payments", color: "hsl(174, 60%, 40%)" },
        { label: "Adjustments", color: "hsl(38, 92%, 50%)" },
      ].map((l) => (
        <div key={l.label} className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: l.color }} />
          <span className="text-xs text-muted-foreground">{l.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default RevenueTrendChart;
