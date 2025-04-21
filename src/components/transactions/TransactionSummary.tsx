
import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/types';
import { PieChart } from '@/components/charts/PieChart';

interface TransactionSummaryProps {
  transactions: Transaction[];
  type: 'income' | 'expense' | 'all';
}

const TransactionSummary = ({ transactions, type }: TransactionSummaryProps) => {
  const filteredTransactions = type === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === type);

  const pieColors = [
    '#9b87f5', '#7E69AB', '#E5DEFF', '#6E59A5', '#D3E4FD', 
    '#33C3F0', '#8B5CF6', '#1EAEDB', '#0FA0CE', '#d1d1e0'
  ];

  // Calculate category data for pie chart
  const categorySummary = useMemo(() => {
    const categories = new Map<string, number>();
    
    filteredTransactions.forEach(transaction => {
      const { category, amount } = transaction;
      const currentAmount = categories.get(category) || 0;
      categories.set(category, currentAmount + amount);
    });
    
    // Convert to array for pie chart
    return Array.from(categories.entries()).map(([name, value]) => ({
      name,
      value
    })).sort((a, b) => b.value - a.value);
  }, [filteredTransactions]);

  // Calculate total
  const total = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  
  // Get top categories (top 3)
  const topCategories = categorySummary.slice(0, 3);

  return (
    <Card className="hover-scale-subtle transition-all">
      <CardHeader>
        <CardTitle>
          {type === 'income' 
            ? 'Income by Category' 
            : type === 'expense' 
            ? 'Expenses by Category' 
            : 'Transactions by Category'}
        </CardTitle>
        <CardDescription>
          {type === 'all' 
            ? 'Breakdown of all your transactions by category'
            : `Breakdown of your ${type === 'income' ? 'income' : 'expenses'} by category`}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <PieChart
            data={categorySummary}
            colors={pieColors}
            height={200}
          />
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Total: ${total.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">
              {filteredTransactions.length} transactions in {categorySummary.length} categories
            </p>
          </div>
          
          {topCategories.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Top Categories</h4>
              <div className="space-y-2">
                {topCategories.map((category, index) => {
                  const percentage = Math.round((category.value / total) * 100);
                  return (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: pieColors[index % pieColors.length] }}
                        />
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <div className="text-sm font-medium">
                        ${category.value.toLocaleString()} ({percentage}%)
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionSummary;
