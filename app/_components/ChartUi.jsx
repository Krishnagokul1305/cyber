import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

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

  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-[40vh] py-5 my-7 w-full shadow-sm bg-gray-50"
    >
      <LineChart
        data={dailyLogins}
        width={600}
        height={300}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="totalLogins"
          stroke="#60a5fa"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  );
}

export default ChartUi;
