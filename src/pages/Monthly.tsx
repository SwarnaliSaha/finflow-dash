
import { useState, useMemo } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, parseISO, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import TransactionList from '@/components/transactions/TransactionList';
import BarChart from '@/components/charts/BarChart';
import TransactionForm from '@/components/transactions/TransactionForm';

const Monthly = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions'>('overview');
  const { transactions, getExpensesByCategory } = useFinance();
  
  // Calculate month range
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  // Format dates for display and filtering
  const formattedMonth = format(currentDate, 'MMMM yyyy');
  const monthStartStr = format(monthStart, 'yyyy-MM-dd');
  const monthEndStr = format(monthEnd, 'yyyy-MM-dd');
  
  // Filter transactions for current month
  const monthlyTransactions = transactions.filter(
    (t) => t.date >= monthStartStr && t.date <= monthEndStr
  );
  
  // Calculate totals
  const monthlyIncome = monthlyTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const monthlyExpenses = monthlyTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const monthlySavings = monthlyIncome - monthlyExpenses;
  
  // Group expenses by category for this month only
  const monthlyExpensesByCategory = useMemo(() => {
    const expenseTransactions = monthlyTransactions.filter((t) => t.type === 'expense');
    const categories: Record<string, number> = {};
    
    expenseTransactions.forEach((t) => {
      if (categories[t.category]) {
        categories[t.category] += t.amount;
      } else {
        categories[t.category] = t.amount;
      }
    });
    
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [monthlyTransactions]);
  
  // Group expenses by day for chart
  const dailyExpenses = useMemo(() => {
    const days: Record<string, { income: number; expense: number }> = {};
    
    monthlyTransactions.forEach((t) => {
      const day = t.date.substring(8, 10); // Format: DD
      
      if (!days[day]) {
        days[day] = { income: 0, expense: 0 };
      }
      
      if (t.type === 'income') {
        days[day].income += t.amount;
      } else {
        days[day].expense += t.amount;
      }
    });
    
    // Convert to array format for charts
    return Object.entries(days)
      .map(([day, data]) => ({
        day: `Day ${parseInt(day)}`,
        income: data.income,
        expense: data.expense
      }))
      .sort((a, b) => a.day.localeCompare(b.day));
  }, [monthlyTransactions]);
  
  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Monthly View</h1>
          <p className="text-muted-foreground">
            Detailed breakdown of your monthly finances
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft size={16} />
          </Button>
          <div className="text-lg font-medium w-40 text-center">{formattedMonth}</div>
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight size={16} />
          </Button>
          <TransactionForm />
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Monthly Income"
          value={`$${monthlyIncome.toLocaleString()}`}
          description={`For ${formattedMonth}`}
          icon={<ChevronRight className="text-finance-income" size={18} />}
        />
        <StatCard
          title="Monthly Expenses"
          value={`$${monthlyExpenses.toLocaleString()}`}
          description={`For ${formattedMonth}`}
          icon={<ChevronRight className="text-finance-expense" size={18} />}
        />
        <StatCard
          title="Monthly Savings"
          value={`$${monthlySavings.toLocaleString()}`}
          description={`For ${formattedMonth}`}
          icon={<ChevronRight className="text-finance-purple" size={18} />}
        />
      </div>
      
      {/* Tab Navigation */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList>
          <TabsTrigger value="overview">Monthly Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions List</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 pt-6">
          {/* Daily Spending Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Spending</CardTitle>
              <CardDescription>
                Track your daily income and expenses for {formattedMonth}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={dailyExpenses}
                xKey="day"
                dataKeys={[
                  { key: 'income', color: '#4ade80' },
                  { key: 'expense', color: '#f87171' }
                ]}
                height={300}
              />
            </CardContent>
          </Card>
          
          {/* Categories Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
              <CardDescription>
                Breakdown of your expenses by category for {formattedMonth}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyExpensesByCategory.length > 0 ? (
                  monthlyExpensesByCategory.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-finance-purple" />
                        <span>{category.name}</span>
                      </div>
                      <span className="font-medium">${category.value.toLocaleString()}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    No expenses recorded for this month
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Transactions for {formattedMonth}</CardTitle>
              <CardDescription>
                All transactions that occurred during this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              {monthlyTransactions.length > 0 ? (
                <TransactionList />
              ) : (
                <p className="text-muted-foreground text-center py-6">
                  No transactions recorded for this month
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Monthly;
