
import { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';
import TimeFrameToggle from '@/components/charts/TimeFrameToggle';

const Reports = () => {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'pie'>('line');
  const {
    getMonthlyData,
    getWeeklyData,
    getExpensesByCategory,
    getIncomesByCategory,
    timeframe
  } = useFinance();

  // Get data based on timeframe
  const timeframeData = timeframe === 'weekly' ? getWeeklyData() : getMonthlyData();
  const chartXKey = timeframe === 'weekly' ? 'name' : 'month';
  
  // Get category data for pie charts
  const expensesByCategory = getExpensesByCategory();
  const incomesByCategory = getIncomesByCategory();
  
  // Chart colors
  const pieColors = [
    '#9b87f5', '#7E69AB', '#E5DEFF', '#6E59A5', '#D3E4FD', 
    '#33C3F0', '#8B5CF6', '#1EAEDB', '#0FA0CE', '#d1d1e0'
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Financial Reports</h1>
          <p className="text-muted-foreground">
            Visualize and analyze your financial data
          </p>
        </div>
        <TimeFrameToggle />
      </div>
      
      {/* Chart Type Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Income & Expense Analysis</CardTitle>
          <CardDescription>
            Explore your financial data using different chart types
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="line" value={chartType} onValueChange={(value) => setChartType(value as any)}>
            <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
              <TabsTrigger value="line">Line Chart</TabsTrigger>
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="pie">Pie Chart</TabsTrigger>
            </TabsList>
            
            <TabsContent value="line" className="pt-4">
              <LineChart
                data={timeframeData}
                xKey={chartXKey}
                lines={[
                  { key: 'income', color: '#4ade80' },
                  { key: 'expense', color: '#f87171' },
                  { key: 'savings', color: '#9b87f5', strokeDasharray: '5 5' }
                ]}
                height={400}
              />
            </TabsContent>
            
            <TabsContent value="bar" className="pt-4">
              <BarChart
                data={timeframeData}
                xKey={chartXKey}
                dataKeys={[
                  { key: 'income', color: '#4ade80' },
                  { key: 'expense', color: '#f87171' },
                  { key: 'savings', color: '#9b87f5' }
                ]}
                height={400}
              />
            </TabsContent>
            
            <TabsContent value="pie" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-center">Expenses by Category</h3>
                  <PieChart
                    data={expensesByCategory}
                    colors={pieColors}
                    height={300}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 text-center">Income by Category</h3>
                  <PieChart
                    data={incomesByCategory}
                    colors={pieColors.slice(5).concat(pieColors.slice(0, 5))}
                    height={300}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Additional Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Spending Trends</CardTitle>
            <CardDescription>
              Analyze your spending patterns over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={timeframeData}
              xKey={chartXKey}
              lines={[{ key: 'expense', color: '#f87171' }]}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Income Sources</CardTitle>
            <CardDescription>
              Track your income streams
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={timeframeData}
              xKey={chartXKey}
              lines={[{ key: 'income', color: '#4ade80' }]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
