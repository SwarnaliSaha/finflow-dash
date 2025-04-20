
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface BarChartProps {
  data: any[];
  xKey: string;
  dataKeys: { key: string; color: string }[];
  height?: number;
}

const BarChart = ({ data, xKey, dataKeys, height = 300 }: BarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
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
        {dataKeys.map((dataKey) => (
          <Bar
            key={dataKey.key}
            dataKey={dataKey.key}
            fill={dataKey.color}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
