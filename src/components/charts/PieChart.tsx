
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface PieChartProps {
  data: Array<{ name: string; value: number }>;
  colors: string[];
  height?: number;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm">
        <p className="font-semibold">{payload[0].name}</p>
        <p className="text-finance-purple">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const PieChart = ({ data, colors, height = 300 }: PieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
