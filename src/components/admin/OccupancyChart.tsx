import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface OccupancyChartProps {
  occupied: number;
  available: number;
  reserved: number;
}

const OccupancyChart = ({ occupied, available, reserved }: OccupancyChartProps) => {
  const total = occupied + available + reserved;

  const data = {
    labels: ["Occupied", "Available", "Reserved"],
    datasets: [
      {
        data: [occupied, available, reserved],
        backgroundColor: [
          "hsl(0 72% 55%)",
          "hsl(142 70% 50%)",
          "hsl(180 70% 55%)",
        ],
        borderColor: [
          "hsl(220 40% 10%)",
          "hsl(220 40% 10%)",
          "hsl(220 40% 10%)",
        ],
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "hsl(210 40% 98%)",
          font: {
            family: "Space Grotesk",
            size: 12,
          },
          padding: 16,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  return (
    <div className="relative h-64">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginBottom: "2.5rem" }}>
        <div className="text-center">
          <p className="text-3xl font-bold font-display text-foreground">{total}</p>
          <p className="text-sm text-muted-foreground">Total Spots</p>
        </div>
      </div>
    </div>
  );
};

export default OccupancyChart;
