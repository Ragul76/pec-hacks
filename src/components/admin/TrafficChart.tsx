import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TrafficChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "hsl(210 40% 98%)",
          font: {
            family: "Space Grotesk",
          },
        },
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
        },
      },
    },
  };

  const labels = ["6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"];

  const data = {
    labels,
    datasets: [
      {
        label: "Incoming",
        data: [12, 45, 67, 89, 56, 78, 95, 45, 23],
        backgroundColor: "hsl(142 70% 50%)",
        borderRadius: 6,
      },
      {
        label: "Outgoing",
        data: [8, 23, 45, 78, 67, 56, 89, 67, 34],
        backgroundColor: "hsl(180 70% 55%)",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="card-eco h-80">
      <h3 className="font-display font-semibold text-lg text-foreground mb-4">
        Traffic Flow
      </h3>
      <div className="h-64">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default TrafficChart;
