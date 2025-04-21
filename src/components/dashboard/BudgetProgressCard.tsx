
import { Budget } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import BudgetEditForm from '@/components/budgets/BudgetEditForm';

type BudgetProgressCardProps = {
  budget: Budget;
};

const BudgetProgressCard = ({ budget }: BudgetProgressCardProps) => {
  const { name, amount, spent, category } = budget;
  
  // Calculate percentage spent
  const percentage = Math.min(Math.round((spent / amount) * 100), 100);
  
  // Determine color based on percentage
  const getProgressColor = () => {
    if (percentage >= 90) return 'bg-finance-expense';
    if (percentage >= 75) return 'bg-amber-500';
    return 'bg-finance-income';
  };
  
  // Format remaining amount
  const remaining = amount - spent;
  const remainingFormatted = remaining.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="font-medium text-sm">{name}</h3>
            <p className="text-xs text-muted-foreground">{category}</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-sm">
              ${spent.toLocaleString()} <span className="text-muted-foreground">/ ${amount.toLocaleString()}</span>
            </p>
            <p className="text-xs text-muted-foreground">{remainingFormatted} left</p>
          </div>
        </div>
        
        <div className="mt-2">
          <Progress value={percentage} className={`h-2 ${getProgressColor()}`} />
          <div className="flex justify-between mt-1">
            <p className="text-xs text-muted-foreground">{percentage}% used</p>
            {percentage >= 90 && (
              <p className="text-xs text-finance-expense font-medium">Budget Alert</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetProgressCard;
