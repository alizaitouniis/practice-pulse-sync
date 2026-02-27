import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface PayerData {
  name: string;
  value: number;
  fill: string;
}

const COLORS = [
  "hsl(174, 60%, 40%)",
  "hsl(215, 50%, 40%)",
  "hsl(38, 92%, 50%)",
  "hsl(152, 60%, 40%)",
  "hsl(0, 72%, 51%)",
];

const PayerMixChart = ({ data }: { data: PayerData[] }) => (
  <div className="rounded-lg border border-border bg-card card-glow p-5 opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
    <h3 className="text-base font-semibold text-card-foreground">Payer Mix</h3>
    <p className="text-sm text-muted-foreground mt-0.5 mb-4">Revenue distribution by insurance</p>
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `${value}%`}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className="grid grid-cols-2 gap-2 mt-2">
      {data.map((d, i) => (
        <div key={d.name} className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i] }} />
          <span className="text-xs text-muted-foreground truncate">{d.name}</span>
          <span className="text-xs font-semibold text-card-foreground ml-auto">{d.value}%</span>
        </div>
      ))}
    </div>
  </div>
);

export default PayerMixChart;
