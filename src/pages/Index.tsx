import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KpiCards from "@/components/dashboard/KpiCards";
import InsuranceAgingTable from "@/components/dashboard/InsuranceAgingTable";
import PatientAgingCard from "@/components/dashboard/PatientAgingCard";
import PayerMixChart from "@/components/dashboard/PayerMixChart";
import RevenueTrendChart from "@/components/dashboard/RevenueTrendChart";
import DenialAnalytics from "@/components/dashboard/DenialAnalytics";
import {
  kpiData,
  insuranceAgingData,
  patientAgingData,
  payerMixData,
  revenueTrendData,
  denialData,
} from "@/data/mockData";

const Index = () => (
  <div className="min-h-screen bg-background">
    <DashboardHeader />
    <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Good morning, Dr. Smith</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Here's your practice performance overview for February 2026</p>
      </div>

      <KpiCards data={kpiData} />

      <InsuranceAgingTable data={insuranceAgingData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueTrendChart data={revenueTrendData} />
        </div>
        <PayerMixChart data={payerMixData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PatientAgingCard data={patientAgingData} />
        <DenialAnalytics data={denialData} />
      </div>
    </main>
  </div>
);

export default Index;
