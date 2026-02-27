import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";

const fmt = (n: number) => `$${n.toLocaleString()}`;

interface Denial {
  code: string;
  reason: string;
  count: number;
  amount: number;
  trend: "up" | "down" | "stable";
}

const trendIcon = {
  up: <TrendingUp className="h-3.5 w-3.5 text-destructive" />,
  down: <TrendingDown className="h-3.5 w-3.5 text-success" />,
  stable: <Minus className="h-3.5 w-3.5 text-muted-foreground" />,
};

const DenialAnalytics = ({ data }: { data: Denial[] }) => (
  <div className="rounded-lg border border-border bg-card card-glow p-5 opacity-0 animate-fade-in" style={{ animationDelay: "500ms" }}>
    <div className="flex items-center gap-2 mb-1">
      <AlertTriangle className="h-4 w-4 text-warning" />
      <h3 className="text-base font-semibold text-card-foreground">Top Denial Codes</h3>
    </div>
    <p className="text-sm text-muted-foreground mb-4">Root cause analysis for revenue recovery</p>
    <div className="space-y-3">
      {data.map((d, i) => (
        <div
          key={d.code}
          className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors"
        >
          <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
            {i + 1}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-card-foreground font-mono">{d.code}</span>
              {trendIcon[d.trend]}
            </div>
            <p className="text-xs text-muted-foreground truncate">{d.reason}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-semibold text-card-foreground font-mono">{fmt(d.amount)}</p>
            <p className="text-xs text-muted-foreground">{d.count} claims</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DenialAnalytics;
