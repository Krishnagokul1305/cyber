"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartContainer } from "@/components/ui/chart";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
  total: {
    label: "Total",
    color: "#60a5fa",
  },
};

function ChartUi({ activities }) {
  function getTotalLoginsPerDay(activities) {
    const loginCounts = activities.reduce((acc, activity) => {
      const loginDate = new Date(activity.loginTime).toLocaleDateString();
      acc[loginDate] = (acc[loginDate] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(loginCounts)
      .map(([date, totalLogins]) => ({ date, totalLogins }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  const dailyLogins = getTotalLoginsPerDay(activities);

  const data = {
    labels: dailyLogins.map((login) => login.date),
    datasets: [
      {
        label: "Total Logins",
        data: dailyLogins.map((login) => login.totalLogins),
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96, 165, 250, 0.5)",
        tension: 0.4, // Smooth lines
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Total Logins: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Logins",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-[40vh] py-5 my-7 w-full shadow-sm bg-gray-50"
    >
      <Line data={data} options={options} />
    </ChartContainer>
  );
}

export default ChartUi;
