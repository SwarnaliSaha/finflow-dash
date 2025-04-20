
import { Transaction, Budget, User } from '@/types';

// Sample user
export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com'
};

// Sample transaction categories
export const expenseCategories = [
  'Food', 'Transportation', 'Housing', 'Entertainment', 
  'Utilities', 'Healthcare', 'Shopping', 'Education', 'Travel'
];

export const incomeCategories = [
  'Salary', 'Investments', 'Freelance', 'Gifts', 'Other'
];

// Helper to create a random date within the last few months
const getRandomDate = (months = 3) => {
  const date = new Date();
  date.setMonth(date.getMonth() - Math.floor(Math.random() * months));
  date.setDate(Math.floor(Math.random() * 28) + 1);
  return date.toISOString().split('T')[0];
};

// Generate mock transactions
export const generateMockTransactions = (count = 50): Transaction[] => {
  const transactions: Transaction[] = [];
  
  for (let i = 0; i < count; i++) {
    const type = Math.random() > 0.3 ? 'expense' : 'income';
    const categories = type === 'expense' ? expenseCategories : incomeCategories;
    
    transactions.push({
      id: `transaction-${i}`,
      amount: type === 'income' 
        ? Math.floor(Math.random() * 3000) + 1000
        : Math.floor(Math.random() * 500) + 10,
      description: `${type === 'income' ? 'Income' : 'Expense'} ${i + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      date: getRandomDate(),
      type
    });
  }
  
  // Sort by date, newest first
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Generate mock budgets
export const generateMockBudgets = (): Budget[] => {
  return [
    { id: 'budget-1', name: 'Food', amount: 500, spent: 320, category: 'Food', period: 'monthly' },
    { id: 'budget-2', name: 'Entertainment', amount: 200, spent: 150, category: 'Entertainment', period: 'monthly' },
    { id: 'budget-3', name: 'Transportation', amount: 300, spent: 280, category: 'Transportation', period: 'monthly' },
    { id: 'budget-4', name: 'Shopping', amount: 400, spent: 390, category: 'Shopping', period: 'monthly' },
    { id: 'budget-5', name: 'Utilities', amount: 250, spent: 220, category: 'Utilities', period: 'monthly' },
  ];
};

// Generate mock data
export const mockTransactions = generateMockTransactions();
export const mockBudgets = generateMockBudgets();

// Function to calculate expenses/income by category
export const calculateByCategory = (transactions: Transaction[], type: 'income' | 'expense') => {
  const filtered = transactions.filter(t => t.type === type);
  const categories: Record<string, number> = {};
  
  filtered.forEach(t => {
    if (categories[t.category]) {
      categories[t.category] += t.amount;
    } else {
      categories[t.category] = t.amount;
    }
  });
  
  return Object.entries(categories).map(([name, value]) => ({ name, value }));
};

// Function to calculate totals by month
export const calculateTotalsByMonth = (transactions: Transaction[]) => {
  const months: Record<string, { income: number; expense: number }> = {};
  
  transactions.forEach(t => {
    const month = t.date.substring(0, 7); // Format: YYYY-MM
    
    if (!months[month]) {
      months[month] = { income: 0, expense: 0 };
    }
    
    if (t.type === 'income') {
      months[month].income += t.amount;
    } else {
      months[month].expense += t.amount;
    }
  });
  
  // Convert to array format for charts
  return Object.entries(months)
    .map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
      savings: data.income - data.expense
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
};

// Function to calculate weekly data
export const calculateWeeklyData = (transactions: Transaction[]) => {
  // This is a simplified version for mock data
  const weeks: Record<string, { income: number; expense: number }> = {
    'Week 1': { income: 0, expense: 0 },
    'Week 2': { income: 0, expense: 0 },
    'Week 3': { income: 0, expense: 0 },
    'Week 4': { income: 0, expense: 0 },
  };
  
  transactions.forEach(t => {
    const day = new Date(t.date).getDate();
    let week = 'Week 1';
    
    if (day > 7 && day <= 14) week = 'Week 2';
    else if (day > 14 && day <= 21) week = 'Week 3';
    else if (day > 21) week = 'Week 4';
    
    if (t.type === 'income') {
      weeks[week].income += t.amount;
    } else {
      weeks[week].expense += t.amount;
    }
  });
  
  return Object.entries(weeks).map(([name, data]) => ({
    name,
    income: data.income,
    expense: data.expense,
    savings: data.income - data.expense
  }));
};
