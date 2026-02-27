import { Activity, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => (
  <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
          <Activity className="h-5 w-5 text-accent-foreground" />
        </div>
        <div>
          <h1 className="text-base font-bold text-foreground leading-tight">PracticePulse</h1>
          <p className="text-xs text-muted-foreground">Provider Dashboard</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
      </div>
    </div>
  </header>
);

export default DashboardHeader;
