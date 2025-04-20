
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BudgetProgressCard from '@/components/dashboard/BudgetProgressCard';
import BudgetForm from '@/components/budgets/BudgetForm';
import PieChart from '@/components/charts/PieChart';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Budgets = () => {
  const { budgets, deleteBudget, getExpensesByCategory } = useFinance();
  
  // Expenses by category for pie chart
  const expensesByCategory = getExpensesByCategory();
  
  // Pie chart colors
  const pieColors = [
    '#9b87f5', '#7E69AB', '#E5DEFF', '#6E59A5', '#D3E4FD', 
    '#33C3F0', '#8B5CF6', '#1EAEDB', '#0FA0CE', '#d1d1e0'
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Budget Management</h1>
          <p className="text-muted-foreground">
            Create and track your budgets to control your spending
          </p>
        </div>
        <BudgetForm />
      </div>
      
      {/* Expense Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Distribution</CardTitle>
          <CardDescription>
            See how your spending is distributed across categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PieChart
            data={expensesByCategory}
            colors={pieColors}
          />
        </CardContent>
      </Card>
      
      {/* Budget List */}
      <div>
        <h2 className="text-xl font-bold mb-4">Your Budgets</h2>
        
        {budgets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {budgets.map((budget) => (
              <div key={budget.id} className="relative group">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={() => deleteBudget(budget.id)}
                >
                  <Trash2 size={16} className="text-muted-foreground hover:text-destructive" />
                </Button>
                <BudgetProgressCard budget={budget} />
              </div>
            ))}
          </div>
        ) : (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No budgets found</AlertTitle>
            <AlertDescription>
              You don't have any budgets yet. Create a budget to track your spending.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Budgets;
