import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

const StatCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-primary",
}: StatCardProps) => {
  const changeColors = {
    positive: "text-primary bg-primary/10",
    negative: "text-destructive bg-destructive/10",
    neutral: "text-muted-foreground bg-muted",
  };

  return (
    <div className="stat-card group hover:border-primary/50">
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-primary/10 ${iconColor}`}>
            <Icon className="h-6 w-6" />
          </div>
          {change && (
            <span
              className={`px-2 py-1 rounded-lg text-sm font-medium ${changeColors[changeType]}`}
            >
              {change}
            </span>
          )}
        </div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <p className="text-3xl font-bold font-display text-foreground">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
