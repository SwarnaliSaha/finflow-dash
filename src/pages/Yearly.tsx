
import { useState, useMemo } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { startOfYear, endOfYear, addYears, subYears, format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';

const Yearly = () => {
  const [currentYear, setCurrentYear] = useState(new Date());
  const { transactions } = useFinance();
  
  // Calculate year range
  const yearStart = startOfYear(currentYear);
  const yearEnd = endOfYear(currentYear);
  
  // Format dates for display and filtering
  const formattedYear = format(currentYear, 'yyyy');
  const yearStartStr = format(yearStart, 'yyyy-MM-dd');
  const yearEndStr = format(yearEnd, 'yyyy-MM-dd');
  
  // Filter transactions for current year
  const yearlyTransactions = transactions.filter(
    (t) => t.date >= yearStartStr && t.date <= yearEndStr
  );
  
  // Calculate totals
  const yearlyIncome = yearlyTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const yearlyExpenses = yearlyTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const yearlySavings = yearlyIncome - yearlyExpenses;
  const savingsRate = yearlyIncome > 0 ? Math.round((yearlySavings / yearlyIncome) * 100) : 0;
  
  // Group by month for charts
  const monthlyData = useMemo(() => {
    const months: Record<string, { income: number; expense: number }> = {
      'Jan': { income: 0, expense: 0 },
      'Feb': { income: 0, expense: 0 },
      'Mar': { income: 0, expense: 0 },
      'Apr': { income: 0, expense: 0 },
      'May': { income: 0, expense: 0 },
      'Jun': { income: 0, expense: 0 },
      'Jul': { income: 0, expense: 0 },
      'Aug': { income: 0, expense: 0 },
      'Sep': { income: 0, expense: 0 },
      'Oct': { income: 0, expense: 0 },
      'Nov': { income: 0, expense: 0 },
      'Dec': { income: 0, expense: 0 },
    };
    
    yearlyTransactions.forEach((t) => {
      const month = format(new Date(t.date), 'MMM');
      
      if (t.type === 'income') {
        months[month].income += t.amount;
      } else {
        months[month].expense += t.amount;
      }
    });
    
    // Convert to array format for charts
    return Object.entries(months).map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
      savings: data.income - data.expense
    }));
  }, [yearlyTransactions]);
  
  // Group expenses by category
  const expensesByCategory = useMemo(() => {
    const categories: Record<string, number> = {};
    
    yearlyTransactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        if (categories[t.category]) {
          categories[t.category] += t.amount;
        } else {
          categories[t.category] = t.amount;
        }
      });
    
    return Object.entries(categories)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [yearlyTransactions]);
  
  // Navigation functions
  const goToPreviousYear = () => {
    setCurrentYear(subYears(currentYear, 1));
  };
  
  const goToNextYear = () => {
    setCurrentYear(addYears(currentYear, 1));
  };
  
  // Pie chart colors
  const pieColors = [
    '#9b87f5', '#7E69AB', '#E5DEFF', '#6E59A5', '#D3E4FD', 
    '#33C3F0', '#8B5CF6', '#1EAEDB', '#0FA0CE', '#d1d1e0'
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Yearly Overview</h1>
          <p className="text-muted-foreground">
            Annual summary of your financial activity
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goToPreviousYear}>
            <ChevronLeft size={16} />
          </Button>
          <div className="text-lg font-medium w-16 text-center">{formattedYear}</div>
          <Button variant="outline" size="icon" onClick={goToNextYear}>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Annual Income"
          value={`$${yearlyIncome.toLocaleString()}`}
          description={`For ${formattedYear}`}
          icon={<ChevronRight className="text-finance-income" size={18} />}
        />
        <StatCard
          title="Annual Expenses"
          value={`$${yearlyExpenses.toLocaleString()}`}
          description={`For ${formattedYear}`}
          icon={<ChevronRight className="text-finance-expense" size={18} />}
        />
        <StatCard
          title="Annual Savings"
          value={`$${yearlySavings.toLocaleString()}`}
          description={`Savings rate: ${savingsRate}%`}
          icon={<ChevronRight className="text-finance-purple" size={18} />}
        />
      </div>
      
      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trends for {formattedYear}</CardTitle>
          <CardDescription>
            Track your income and expenses month by month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart
            data={monthlyData}
            xKey="month"
            lines={[
              { key: 'income', color: '#4ade80' },
              { key: 'expense', color: '#f87171' },
              { key: 'savings', color: '#9b87f5', strokeDasharray: '5 5' }
            ]}
            height={300}
          />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Distribution</CardTitle>
            <CardDescription>
              Compare monthly income and expenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={monthlyData}
              xKey="month"
              dataKeys={[
                { key: 'income', color: '#4ade80' },
                { key: 'expense', color: '#f87171' }
              ]}
              height={300}
            />
          </CardContent>
        </Card>
        
        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>
              Breakdown of your expenses by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart
              data={expensesByCategory}
              colors={pieColors}
              height={300}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Top Expense Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Top Expense Categories</CardTitle>
          <CardDescription>
            Your biggest spending areas for {formattedYear}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expensesByCategory.slice(0, 5).map((category, index) => (
              <div key={category.name} className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{category.name}</span>
                  <span className="font-medium">${category.value.toLocaleString()}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-finance-purple rounded-full h-2"
                    style={{
                      width: `${Math.min(
                        100,
                        (category.value / (expensesByCategory[0]?.value || 1)) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Yearly;
