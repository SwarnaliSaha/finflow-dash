
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Budget } from '@/types';
import { cn } from '@/lib/utils';

interface BudgetProgressCardProps {
  budget: Budget;
}

const BudgetProgressCard = ({ budget }: BudgetProgressCardProps) => {
  const percentSpent = Math.min(100, Math.round((budget.spent / budget.amount) * 100));
  const remaining = budget.amount - budget.spent;
  
  // Colors based on spending progress
  const getStatusColor = () => {
    if (percentSpent > 90) return 'text-finance-expense';
    if (percentSpent > 75) return 'text-orange-500';
    return 'text-finance-income';
  };
  
  const getProgressColor = () => {
    if (percentSpent > 90) return 'bg-finance-expense';
    if (percentSpent > 75) return 'bg-orange-500';
    return 'bg-finance-income';
  };

  return (
    <Card className="animated-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{budget.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>${budget.spent.toLocaleString()} spent</span>
            <span className={cn("font-medium", getStatusColor())}>
              ${remaining.toLocaleString()} left
            </span>
          </div>
          <Progress
            value={percentSpent}
            className="h-2 bg-muted"
            indicatorClassName={getProgressColor()}
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Total: ${budget.amount.toLocaleString()}</span>
            <span>{percentSpent}% used</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetProgressCard;
