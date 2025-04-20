
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction, Budget, TimeFrame } from '@/types';
import { 
  mockTransactions, 
  mockBudgets, 
  calculateByCategory, 
  calculateTotalsByMonth,
  calculateWeeklyData
} from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

interface FinanceContextType {
  transactions: Transaction[];
  budgets: Budget[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addBudget: (budget: Omit<Budget, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  deleteBudget: (id: string) => void;
  getExpensesByCategory: () => { name: string; value: number }[];
  getIncomesByCategory: () => { name: string; value: number }[];
  getMonthlyData: () => { month: string; income: number; expense: number; savings: number }[];
  getWeeklyData: () => { name: string; income: number; expense: number; savings: number }[];
  getTransactionsByDate: (startDate: string, endDate?: string) => Transaction[];
  totalIncome: number;
  totalExpenses: number;
  timeframe: TimeFrame;
  setTimeframe: (timeframe: TimeFrame) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [timeframe, setTimeframe] = useState<TimeFrame>('monthly');
  const { toast } = useToast();

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  // Add a new transaction
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `transaction-${Date.now()}`,
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    toast({
      title: `${transaction.type === 'income' ? 'Income' : 'Expense'} added`,
      description: `${transaction.description} for $${transaction.amount}`,
    });
  };

  // Add a new budget
  const addBudget = (budget: Omit<Budget, 'id'>) => {
    const newBudget: Budget = {
      ...budget,
      id: `budget-${Date.now()}`,
    };
    
    setBudgets(prev => [...prev, newBudget]);
    toast({
      title: "Budget added",
      description: `${newBudget.name} for $${newBudget.amount}`,
    });
  };

  // Delete a transaction
  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Transaction deleted",
    });
  };

  // Delete a budget
  const deleteBudget = (id: string) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
    toast({
      title: "Budget deleted",
    });
  };

  // Get expenses grouped by category for charts
  const getExpensesByCategory = () => {
    return calculateByCategory(transactions, 'expense');
  };

  // Get income grouped by category for charts
  const getIncomesByCategory = () => {
    return calculateByCategory(transactions, 'income');
  };

  // Get monthly data for charts
  const getMonthlyData = () => {
    return calculateTotalsByMonth(transactions);
  };

  // Get weekly data for charts
  const getWeeklyData = () => {
    return calculateWeeklyData(transactions);
  };

  // Get transactions within a date range
  const getTransactionsByDate = (startDate: string, endDate?: string) => {
    return transactions.filter(t => {
      if (endDate) {
        return t.date >= startDate && t.date <= endDate;
      }
      return t.date >= startDate;
    });
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        budgets,
        addTransaction,
        addBudget,
        deleteTransaction,
        deleteBudget,
        getExpensesByCategory,
        getIncomesByCategory,
        getMonthlyData,
        getWeeklyData,
        getTransactionsByDate,
        totalIncome,
        totalExpenses,
        timeframe,
        setTimeframe,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
