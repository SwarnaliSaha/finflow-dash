
import { Button } from '@/components/ui/button';
import { TimeFrame } from '@/types';
import { useFinance } from '@/context/FinanceContext';
import { cn } from '@/lib/utils';

const TimeFrameToggle = () => {
  const { timeframe, setTimeframe } = useFinance();

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setTimeframe('weekly')}
        className={cn(
          timeframe === 'weekly' && "bg-primary text-primary-foreground"
        )}
      >
        Weekly
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setTimeframe('monthly')}
        className={cn(
          timeframe === 'monthly' && "bg-primary text-primary-foreground"
        )}
      >
        Monthly
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setTimeframe('yearly')}
        className={cn(
          timeframe === 'yearly' && "bg-primary text-primary-foreground"
        )}
      >
        Yearly
      </Button>
    </div>
  );
};

export default TimeFrameToggle;
