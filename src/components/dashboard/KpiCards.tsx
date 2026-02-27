import { DollarSign, TrendingUp, TrendingDown, Activity, PiggyBank, BarChart3 } from "lucide-react";

const fmt = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n.toLocaleString()}`;

interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: React.ReactNode;
  delay: number;
}

const KpiCard = ({ title, value, change, positive, icon, delay }: KpiCardProps) => (
  <div
    className="rounded-lg border border-border bg-card p-5 card-glow hover:card-glow-hover transition-shadow duration-200 opacity-0 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
      <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
        {icon}
      </div>
    </div>
    <p className="text-2xl font-bold tracking-tight text-card-foreground">{value}</p>
    {change && (
      <div className="flex items-center gap-1 mt-2">
        {positive ? (
          <TrendingUp className="h-3.5 w-3.5 text-success" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5 text-destructive" />
        )}
        <span className={`text-xs font-medium ${positive ? "text-success" : "text-destructive"}`}>
          {change}
        </span>
        <span className="text-xs text-muted-foreground">vs last month</span>
      </div>
    )}
  </div>
);

interface KpiCardsProps {
  data: {
    totalCharges: number;
    paymentsCollected: number;
    adjustments: number;
    outstandingAR: number;
    collectionRate: number;
    monthlyRevenue: number;
  };
}

const KpiCards = ({ data }: KpiCardsProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
    <KpiCard title="Total Charges" value={fmt(data.totalCharges)} change="+5.9%" positive icon={<DollarSign className="h-4 w-4" />} delay={0} />
    <KpiCard title="Payments" value={fmt(data.paymentsCollected)} change="+4.7%" positive icon={<PiggyBank className="h-4 w-4" />} delay={50} />
    <KpiCard title="Adjustments" value={fmt(data.adjustments)} change="-3.6%" positive icon={<Activity className="h-4 w-4" />} delay={100} />
    <KpiCard title="Outstanding A/R" value={fmt(data.outstandingAR)} change="+2.1%" positive={false} icon={<BarChart3 className="h-4 w-4" />} delay={150} />
    <KpiCard title="Collection Rate" value={`${data.collectionRate}%`} change="+1.2%" positive icon={<TrendingUp className="h-4 w-4" />} delay={200} />
    <KpiCard title="Monthly Revenue" value={fmt(data.monthlyRevenue)} change="+4.7%" positive icon={<DollarSign className="h-4 w-4" />} delay={250} />
  </div>
);

export default KpiCards;
