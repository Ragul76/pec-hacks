import { useState } from "react";
import Header from "@/components/layout/Header";
import StatCard from "@/components/admin/StatCard";
import TrafficChart from "@/components/admin/TrafficChart";
import RevenueChart from "@/components/admin/RevenueChart";
import OccupancyChart from "@/components/admin/OccupancyChart";
import RecentActivity from "@/components/admin/RecentActivity";
import { 
  Car, 
  ParkingCircle, 
  DollarSign, 
  TrendingUp,
  Leaf,
  Zap,
  BarChart3,
  Activity
} from "lucide-react";

const Admin = () => {
  const [revenuePeriod, setRevenuePeriod] = useState<"hourly" | "daily">("hourly");

  const stats = {
    totalSpots: 200,
    occupied: 142,
    available: 48,
    reserved: 10,
    revenue: 4567,
    trafficToday: 892,
    evCharging: 24,
    greenScore: 87,
  };

  return (
    <div className="min-h-screen bg-background dark">
      <Header />

      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Admin <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage your smart parking system in real-time.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="animate-slide-up" style={{ animationDelay: "0ms" }}>
              <StatCard
                title="Total Spots"
                value={stats.totalSpots}
                icon={ParkingCircle}
                iconColor="text-primary"
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
              <StatCard
                title="Occupied"
                value={stats.occupied}
                change="+12%"
                changeType="neutral"
                icon={Car}
                iconColor="text-destructive"
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
              <StatCard
                title="Available"
                value={stats.available}
                change="-5%"
                changeType="negative"
                icon={ParkingCircle}
                iconColor="text-primary"
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
              <StatCard
                title="Today's Revenue"
                value={`$${stats.revenue.toLocaleString()}`}
                change="+23%"
                changeType="positive"
                icon={DollarSign}
                iconColor="text-secondary"
              />
            </div>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="animate-slide-up" style={{ animationDelay: "400ms" }}>
              <StatCard
                title="Traffic Today"
                value={stats.trafficToday}
                icon={TrendingUp}
                iconColor="text-accent"
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "500ms" }}>
              <StatCard
                title="EV Charging"
                value={stats.evCharging}
                icon={Zap}
                iconColor="text-secondary"
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "600ms" }}>
              <StatCard
                title="Green Score"
                value={`${stats.greenScore}%`}
                change="+3%"
                changeType="positive"
                icon={Leaf}
                iconColor="text-primary"
              />
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "700ms" }}>
              <StatCard
                title="Utilization"
                value="71%"
                icon={Activity}
                iconColor="text-chart-4"
              />
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Traffic Chart */}
            <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "800ms" }}>
              <TrafficChart />
            </div>

            {/* Occupancy Chart */}
            <div className="animate-slide-up" style={{ animationDelay: "900ms" }}>
              <div className="card-eco h-80">
                <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                  Spot Occupancy
                </h3>
                <OccupancyChart
                  occupied={stats.occupied}
                  available={stats.available}
                  reserved={stats.reserved}
                />
              </div>
            </div>
          </div>

          {/* Revenue & Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="animate-slide-up" style={{ animationDelay: "1000ms" }}>
              <div className="card-eco">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-lg text-foreground flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Revenue Analytics
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setRevenuePeriod("hourly")}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        revenuePeriod === "hourly"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      Hourly
                    </button>
                    <button
                      onClick={() => setRevenuePeriod("daily")}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        revenuePeriod === "daily"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      Daily
                    </button>
                  </div>
                </div>
                <RevenueChart period={revenuePeriod} />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="animate-slide-up" style={{ animationDelay: "1100ms" }}>
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
