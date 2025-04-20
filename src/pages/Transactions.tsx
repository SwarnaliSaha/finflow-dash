
import { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransactionList from '@/components/transactions/TransactionList';
import TransactionForm from '@/components/transactions/TransactionForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, CreditCard } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import BarChart from '@/components/charts/BarChart';
import TimeFrameToggle from '@/components/charts/TimeFrameToggle';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'income' | 'expense'>('all');
  const { 
    transactions, 
    totalIncome, 
    totalExpenses,
    getMonthlyData,
    getWeeklyData,
    timeframe
  } = useFinance();

  // Filter transactions by type
  const filteredTransactions = activeTab === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === activeTab);
    
  // Get data based on timeframe
  const chartData = timeframe === 'weekly' ? getWeeklyData() : getMonthlyData();
  const chartXKey = timeframe === 'weekly' ? 'name' : 'month';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">
            Manage and track all your transactions
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <TimeFrameToggle />
          <TransactionForm />
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Income"
          value={`$${totalIncome.toLocaleString()}`}
          icon={<ArrowUp className="text-finance-income" size={18} />}
        />
        <StatCard
          title="Total Expenses"
          value={`$${totalExpenses.toLocaleString()}`}
          icon={<ArrowDown className="text-finance-expense" size={18} />}
        />
        <StatCard
          title="Net Balance"
          value={`$${(totalIncome - totalExpenses).toLocaleString()}`}
          icon={<CreditCard className="text-finance-purple" size={18} />}
        />
      </div>
      
      {/* Transactions Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            {timeframe === 'weekly' ? 'Weekly' : timeframe === 'monthly' ? 'Monthly' : 'Yearly'} breakdown of your income and expenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            data={chartData}
            xKey={chartXKey}
            dataKeys={[
              { key: 'income', color: '#4ade80' },
              { key: 'expense', color: '#f87171' }
            ]}
          />
        </CardContent>
      </Card>
      
      {/* Transactions List */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList>
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expense">Expenses</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab}>
          <TransactionList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Transactions;
