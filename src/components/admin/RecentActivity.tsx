import { Car, ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";

interface Activity {
  id: string;
  type: "entry" | "exit";
  vehicleNumber: string;
  spot: string;
  time: string;
}

const RecentActivity = () => {
  const activities: Activity[] = [
    { id: "1", type: "entry", vehicleNumber: "NYC 4532", spot: "A-15", time: "2 min ago" },
    { id: "2", type: "exit", vehicleNumber: "NJ 8891", spot: "B-08", time: "5 min ago" },
    { id: "3", type: "entry", vehicleNumber: "CT 2234", spot: "C-22", time: "8 min ago" },
    { id: "4", type: "exit", vehicleNumber: "NY 7765", spot: "A-03", time: "12 min ago" },
    { id: "5", type: "entry", vehicleNumber: "PA 1123", spot: "D-11", time: "15 min ago" },
    { id: "6", type: "exit", vehicleNumber: "NJ 5567", spot: "B-19", time: "18 min ago" },
  ];

  return (
    <div className="card-eco">
      <h3 className="font-display font-semibold text-lg text-foreground mb-4">
        Recent Activity
      </h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div
              className={`p-2 rounded-lg ${
                activity.type === "entry"
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary/10 text-secondary"
              }`}
            >
              {activity.type === "entry" ? (
                <ArrowDownLeft className="h-4 w-4" />
              ) : (
                <ArrowUpRight className="h-4 w-4" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-foreground truncate">
                  {activity.vehicleNumber}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {activity.type === "entry" ? "Entered" : "Exited"} spot {activity.spot}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              {activity.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
