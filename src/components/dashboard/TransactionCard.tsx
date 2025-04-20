
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/types';
import { parseISO, format } from 'date-fns';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const isIncome = transaction.type === 'income';
  const date = parseISO(transaction.date);
  const formattedDate = format(date, 'MMM dd, yyyy');

  return (
    <Card className="animated-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span>{transaction.description}</span>
          <span
            className={cn(
              "flex items-center gap-1 text-sm",
              isIncome ? "text-finance-income" : "text-finance-expense"
            )}
          >
            {isIncome ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
            ${transaction.amount.toLocaleString()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="bg-muted px-2 py-1 rounded-full">
            {transaction.category}
          </span>
          <span>{formattedDate}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
