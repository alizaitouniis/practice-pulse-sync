export const insuranceAgingData = [
  { insurance: "BCBS", "0-30": 45200, "31-60": 18500, "61-90": 9200, "91-120": 4100, "120+": 2000, total: 79000 },
  { insurance: "Medicare", "0-30": 38000, "31-60": 12300, "61-90": 6700, "91-120": 3200, "120+": 1500, total: 61700 },
  { insurance: "UHC", "0-30": 29400, "31-60": 15800, "61-90": 10600, "91-120": 6900, "120+": 3400, total: 66100 },
  { insurance: "Medicaid", "0-30": 19200, "31-60": 9400, "61-90": 5000, "91-120": 2800, "120+": 1200, total: 37600 },
  { insurance: "Aetna", "0-30": 21000, "31-60": 8700, "61-90": 3900, "91-120": 1600, "120+": 800, total: 36000 },
];

export const patientAgingData = [
  { bucket: "0–30 Days", balance: 22500, pct: 40 },
  { bucket: "31–60 Days", balance: 14200, pct: 25 },
  { bucket: "61–90 Days", balance: 9000, pct: 16 },
  { bucket: "91–120 Days", balance: 6300, pct: 11 },
  { bucket: "120+ Days", balance: 4200, pct: 8 },
];

export const payerMixData = [
  { name: "Medicare", value: 35, fill: "hsl(var(--chart-1))" },
  { name: "BCBS", value: 25, fill: "hsl(var(--chart-2))" },
  { name: "UHC", value: 20, fill: "hsl(var(--chart-3))" },
  { name: "Medicaid", value: 10, fill: "hsl(var(--chart-4))" },
  { name: "Commercial", value: 10, fill: "hsl(var(--chart-5))" },
];

export const denialData = [
  { code: "CO-16", reason: "Claim lacks information", count: 142, amount: 34200, trend: "up" as const },
  { code: "CO-4", reason: "Procedure not covered", count: 98, amount: 28700, trend: "down" as const },
  { code: "PR-1", reason: "Deductible amount", count: 87, amount: 19500, trend: "stable" as const },
  { code: "CO-197", reason: "Authorization required", count: 64, amount: 15800, trend: "up" as const },
  { code: "CO-18", reason: "Duplicate claim", count: 41, amount: 8900, trend: "down" as const },
];

export const revenueTrendData = [
  { month: "Sep", charges: 285000, payments: 218000, adjustments: 32000 },
  { month: "Oct", charges: 310000, payments: 242000, adjustments: 28000 },
  { month: "Nov", charges: 295000, payments: 235000, adjustments: 31000 },
  { month: "Dec", charges: 275000, payments: 210000, adjustments: 35000 },
  { month: "Jan", charges: 320000, payments: 256000, adjustments: 29000 },
  { month: "Feb", charges: 340000, payments: 268000, adjustments: 27000 },
];

export const kpiData = {
  totalCharges: 340000,
  paymentsCollected: 268000,
  adjustments: 27000,
  outstandingAR: 280400,
  collectionRate: 78.8,
  monthlyRevenue: 268000,
};
