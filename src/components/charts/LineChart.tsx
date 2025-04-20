
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface LineChartProps {
  data: any[];
  xKey: string;
  lines: { key: string; color: string; strokeDasharray?: string }[];
  height?: number;
}

const LineChart = ({ data, xKey, lines, height = 300 }: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#f0f0f0' }}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: '#f0f0f0' }}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          formatter={(value: number) => `$${value.toLocaleString()}`}
          labelStyle={{ fontWeight: 'bold' }}
          contentStyle={{
            background: 'white',
            border: '1px solid #f0f0f0',
            borderRadius: '8px',
            padding: '8px',
          }}
        />
        <Legend />
        {lines.map((line) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            strokeWidth={2}
            strokeDasharray={line.strokeDasharray}
            activeDot={{ r: 6 }}
            dot={{ r: 4 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
