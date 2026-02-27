import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const fmt = (n: number) => `$${n.toLocaleString()}`;

interface Row {
  insurance: string;
  "0-30": number;
  "31-60": number;
  "61-90": number;
  "91-120": number;
  "120+": number;
  total: number;
}

const InsuranceAgingTable = ({ data }: { data: Row[] }) => {
  const totals = data.reduce(
    (acc, r) => ({
      "0-30": acc["0-30"] + r["0-30"],
      "31-60": acc["31-60"] + r["31-60"],
      "61-90": acc["61-90"] + r["61-90"],
      "91-120": acc["91-120"] + r["91-120"],
      "120+": acc["120+"] + r["120+"],
      total: acc.total + r.total,
    }),
    { "0-30": 0, "31-60": 0, "61-90": 0, "91-120": 0, "120+": 0, total: 0 }
  );

  return (
    <div className="rounded-lg border border-border bg-card card-glow overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
      <div className="p-5 border-b border-border">
        <h3 className="text-base font-semibold text-card-foreground">Insurance Aging (A/R)</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Outstanding balances by payer and aging bucket</p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Insurance</TableHead>
              <TableHead className="text-right font-semibold">0–30</TableHead>
              <TableHead className="text-right font-semibold">31–60</TableHead>
              <TableHead className="text-right font-semibold">61–90</TableHead>
              <TableHead className="text-right font-semibold">91–120</TableHead>
              <TableHead className="text-right font-semibold">120+</TableHead>
              <TableHead className="text-right font-semibold">Total A/R</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.insurance} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium">{row.insurance}</TableCell>
                <TableCell className="text-right font-mono text-sm">{fmt(row["0-30"])}</TableCell>
                <TableCell className="text-right font-mono text-sm">{fmt(row["31-60"])}</TableCell>
                <TableCell className="text-right font-mono text-sm">{fmt(row["61-90"])}</TableCell>
                <TableCell className="text-right font-mono text-sm">{fmt(row["91-120"])}</TableCell>
                <TableCell className="text-right font-mono text-sm text-destructive">{fmt(row["120+"])}</TableCell>
                <TableCell className="text-right font-mono text-sm font-semibold">{fmt(row.total)}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-primary/5 font-semibold border-t-2 border-border">
              <TableCell>Total</TableCell>
              <TableCell className="text-right font-mono text-sm">{fmt(totals["0-30"])}</TableCell>
              <TableCell className="text-right font-mono text-sm">{fmt(totals["31-60"])}</TableCell>
              <TableCell className="text-right font-mono text-sm">{fmt(totals["61-90"])}</TableCell>
              <TableCell className="text-right font-mono text-sm">{fmt(totals["91-120"])}</TableCell>
              <TableCell className="text-right font-mono text-sm text-destructive">{fmt(totals["120+"])}</TableCell>
              <TableCell className="text-right font-mono text-sm">{fmt(totals.total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InsuranceAgingTable;
