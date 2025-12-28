import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RevenueChartProps {
  period: "hourly" | "daily";
}

const RevenueChart = ({ period }: RevenueChartProps) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "hsl(220 30% 20%)",
        },
        ticks: {
          color: "hsl(220 15% 65%)",
        },
      },
      y: {
        grid: {
          color: "hsl(220 30% 20%)",
        },
        ticks: {
          color: "hsl(220 15% 65%)",
          callback: function (value: any) {
            return "$" + value;
          },
        },
      },
    },
    tension: 0.4,
  };

  const hourlyLabels = [
    "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM",
    "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM"
  ];

  const dailyLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const hourlyData = [45, 89, 156, 234, 267, 289, 345, 378, 356, 312, 278, 256, 289, 234, 156];
  const dailyData = [1250, 1890, 2340, 2150, 2670, 3120, 2890];

  const data = {
    labels: period === "hourly" ? hourlyLabels : dailyLabels,
    datasets: [
      {
        label: "Revenue",
        data: period === "hourly" ? hourlyData : dailyData,
        borderColor: "hsl(142 70% 50%)",
        backgroundColor: "hsl(142 70% 50% / 0.1)",
        fill: true,
        pointBackgroundColor: "hsl(142 70% 50%)",
        pointBorderColor: "hsl(142 70% 50%)",
        pointHoverBackgroundColor: "hsl(180 100% 50%)",
        pointHoverBorderColor: "hsl(180 100% 50%)",
      },
    ],
  };

  return (
    <div className="h-64">
      <Line options={options} data={data} />
    </div>
  );
};

export default RevenueChart;
