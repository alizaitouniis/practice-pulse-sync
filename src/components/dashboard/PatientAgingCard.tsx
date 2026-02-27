import { Progress } from "@/components/ui/progress";

const fmt = (n: number) => `$${n.toLocaleString()}`;

interface Bucket {
  bucket: string;
  balance: number;
  pct: number;
}

const PatientAgingCard = ({ data }: { data: Bucket[] }) => {
  const total = data.reduce((s, d) => s + d.balance, 0);

  return (
    <div className="rounded-lg border border-border bg-card card-glow p-5 opacity-0 animate-fade-in" style={{ animationDelay: "350ms" }}>
      <h3 className="text-base font-semibold text-card-foreground">Patient Aging</h3>
      <p className="text-sm text-muted-foreground mt-0.5 mb-4">Self-pay balances by aging bucket</p>
      <div className="text-2xl font-bold text-card-foreground mb-5">{fmt(total)}</div>
      <div className="space-y-4">
        {data.map((d) => (
          <div key={d.bucket}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-card-foreground">{d.bucket}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-muted-foreground">{fmt(d.balance)}</span>
                <span className="text-xs font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                  {d.pct}%
                </span>
              </div>
            </div>
            <Progress value={d.pct} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientAgingCard;
