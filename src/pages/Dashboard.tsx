
import { ArrowDown, ArrowUp, Clock, CreditCard, DollarSign, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFinance } from '@/context/FinanceContext';
import StatCard from '@/components/dashboard/StatCard';
import BudgetProgressCard from '@/components/dashboard/BudgetProgressCard';
import TransactionCard from '@/components/dashboard/TransactionCard';
import LineChart from '@/components/charts/LineChart';
import PieChart from '@/components/charts/PieChart';
import TimeFrameToggle from '@/components/charts/TimeFrameToggle';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { 
    transactions, 
    budgets, 
    totalIncome, 
    totalExpenses,
    getExpensesByCategory,
    getMonthlyData,
    timeframe
  } = useFinance();

  // Get recent transactions (last 5)
  const recentTransactions = transactions.slice(0, 5);
  
  // Get expenses by category for pie chart
  const expensesByCategory = getExpensesByCategory();
  
  // Get monthly data for line chart
  const monthlyData = getMonthlyData();
  
  // Calculate savings and savings rate
  const savings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.round((savings / totalIncome) * 100) : 0;
  
  // Pie chart colors
  const pieColors = [
    '#9b87f5', '#7E69AB', '#E5DEFF', '#6E59A5', '#D3E4FD', 
    '#33C3F0', '#8B5CF6', '#1EAEDB', '#0FA0CE', '#d1d1e0'
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Financial Dashboard</h1>
          <p className="text-muted-foreground">
            Track your income, expenses, and budgets
          </p>
        </div>
        <div className="flex gap-2">
          <TimeFrameToggle />
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Income"
          value={`$${totalIncome.toLocaleString()}`}
          description={`${timeframe === 'weekly' ? 'This week' : timeframe === 'monthly' ? 'This month' : 'This year'}`}
          icon={<ArrowUp className="text-finance-income" size={18} />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Expenses"
          value={`$${totalExpenses.toLocaleString()}`}
          description={`${timeframe === 'weekly' ? 'This week' : timeframe === 'monthly' ? 'This month' : 'This year'}`}
          icon={<ArrowDown className="text-finance-expense" size={18} />}
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="Net Savings"
          value={`$${savings.toLocaleString()}`}
          description={`Savings rate: ${savingsRate}%`}
          icon={<DollarSign className="text-finance-purple" size={18} />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Pending Transactions"
          value="3"
          description="Awaiting processing"
          icon={<Clock className="text-muted-foreground" size={18} />}
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Income vs. Expenses</CardTitle>
            <CardDescription>
              Track your financial flow over time
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
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
            <CardDescription>
              See where your money is going
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart
              data={expensesByCategory}
              colors={pieColors}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Budget Progress */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Budget Status</h2>
          <Link to="/budgets">
            <Button variant="outline" size="sm" className="gap-1">
              <Plus size={16} />
              Manage Budgets
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {budgets.slice(0, 3).map((budget) => (
            <BudgetProgressCard key={budget.id} budget={budget} />
          ))}
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Transactions</h2>
          <Link to="/transactions">
            <Button variant="outline" size="sm" className="gap-1">
              <CreditCard size={16} />
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
