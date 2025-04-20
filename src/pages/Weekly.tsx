
import { useState, useMemo } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format, eachDayOfInterval } from 'date-fns';
import StatCard from '@/components/dashboard/StatCard';
import BarChart from '@/components/charts/BarChart';
import TransactionCard from '@/components/dashboard/TransactionCard';
import TransactionForm from '@/components/transactions/TransactionForm';

const Weekly = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { transactions } = useFinance();
  
  // Calculate week range
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  
  // Get all days of the week
  const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  // Format dates for display and filtering
  const weekDateRange = `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
  const weekStartStr = format(weekStart, 'yyyy-MM-dd');
  const weekEndStr = format(weekEnd, 'yyyy-MM-dd');
  
  // Filter transactions for current week
  const weeklyTransactions = transactions.filter(
    (t) => t.date >= weekStartStr && t.date <= weekEndStr
  );
  
  // Calculate totals
  const weeklyIncome = weeklyTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const weeklyExpenses = weeklyTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const weeklySavings = weeklyIncome - weeklyExpenses;
  
  // Group by day for charts
  const dailyData = useMemo(() => {
    const dayData = daysOfWeek.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const dayTransactions = weeklyTransactions.filter(t => t.date === dayStr);
      
      const income = dayTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
        
      const expense = dayTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
        
      return {
        day: format(day, 'EEE'),
        income,
        expense,
        savings: income - expense
      };
    });
    
    return dayData;
  }, [weeklyTransactions, daysOfWeek]);
  
  // Navigation functions
  const goToPreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };
  
  const goToNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Weekly View</h1>
          <p className="text-muted-foreground">
            Track your finances week by week
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
            <ChevronLeft size={16} />
          </Button>
          <div className="text-lg font-medium">{weekDateRange}</div>
          <Button variant="outline" size="icon" onClick={goToNextWeek}>
            <ChevronRight size={16} />
          </Button>
          <TransactionForm />
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Weekly Income"
          value={`$${weeklyIncome.toLocaleString()}`}
          description={`For week of ${format(weekStart, 'MMM d')}`}
          icon={<ChevronRight className="text-finance-income" size={18} />}
        />
        <StatCard
          title="Weekly Expenses"
          value={`$${weeklyExpenses.toLocaleString()}`}
          description={`For week of ${format(weekStart, 'MMM d')}`}
          icon={<ChevronRight className="text-finance-expense" size={18} />}
        />
        <StatCard
          title="Weekly Savings"
          value={`$${weeklySavings.toLocaleString()}`}
          description={`For week of ${format(weekStart, 'MMM d')}`}
          icon={<ChevronRight className="text-finance-purple" size={18} />}
        />
      </div>
      
      {/* Daily Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Financial Activity</CardTitle>
          <CardDescription>
            Track your daily income and expenses for the week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            data={dailyData}
            xKey="day"
            dataKeys={[
              { key: 'income', color: '#4ade80' },
              { key: 'expense', color: '#f87171' }
            ]}
            height={300}
          />
        </CardContent>
      </Card>
      
      {/* Week Transactions */}
      <div>
        <h2 className="text-xl font-bold mb-4">This Week's Transactions</h2>
        {weeklyTransactions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {weeklyTransactions.map((transaction) => (
              <TransactionCard 
                key={transaction.id} 
                transaction={transaction} 
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-6">
              <p className="text-muted-foreground text-center">
                No transactions recorded for this week
              </p>
              <div className="flex justify-center mt-4">
                <TransactionForm />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Weekly;
