
import { useState, useEffect } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransactionList from '@/components/transactions/TransactionList';
import TransactionForm from '@/components/transactions/TransactionForm';
import ExportTransactions from '@/components/transactions/ExportTransactions';
import TransactionSummary from '@/components/transactions/TransactionSummary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, CreditCard, Filter } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import BarChart from '@/components/charts/BarChart';
import TimeFrameToggle from '@/components/charts/TimeFrameToggle';
import { Transaction } from '@/types';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'income' | 'expense'>('all');
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const { 
    transactions, 
    totalIncome, 
    totalExpenses,
    getMonthlyData,
    getWeeklyData,
    timeframe
  } = useFinance();

  // Update filtered transactions when active tab or transactions change
  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(transactions.filter(t => t.type === activeTab));
    }
  }, [activeTab, transactions]);
    
  // Get data based on timeframe
  const chartData = timeframe === 'weekly' ? getWeeklyData() : getMonthlyData();
  const chartXKey = timeframe === 'weekly' ? 'name' : 'month';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">
            Manage and track all your transactions
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <TimeFrameToggle />
          <div className="flex gap-2">
            <ExportTransactions transactions={filteredTransactions} />
            <TransactionForm />
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Income"
          value={`$${totalIncome.toLocaleString()}`}
          icon={<ArrowUp className="text-finance-income" size={18} />}
          description={activeTab === 'income' ? 'Filtered income' : 'All time income'}
        />
        <StatCard
          title="Total Expenses"
          value={`$${totalExpenses.toLocaleString()}`}
          icon={<ArrowDown className="text-finance-expense" size={18} />}
          description={activeTab === 'expense' ? 'Filtered expenses' : 'All time expenses'}
        />
        <StatCard
          title="Net Balance"
          value={`$${(totalIncome - totalExpenses).toLocaleString()}`}
          icon={<CreditCard className="text-finance-purple" size={18} />}
          description="Income minus expenses"
        />
      </div>
      
      {/* Transactions Chart */}
      <Card className="hover-scale-subtle transition-all">
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
      
      {/* Transaction Summary */}
      <TransactionSummary transactions={transactions} type={activeTab as any} />
      
      {/* Transactions List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expense">Expenses</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <TransactionList transactions={filteredTransactions} />
      </div>
    </div>
  );
};

export default Transactions;
