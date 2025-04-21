
import { Button } from '@/components/ui/button';
import { TimeFrame } from '@/types';
import { useFinance } from '@/context/FinanceContext';
import { cn } from '@/lib/utils';
import { Calendar, Clock, PieChart } from 'lucide-react';

const TimeFrameToggle = () => {
  const { timeframe, setTimeframe } = useFinance();

  return (
    <div className="flex space-x-2 animate-fade-in">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setTimeframe('weekly')}
        className={cn(
          "transition-all",
          timeframe === 'weekly' && "bg-primary text-primary-foreground"
        )}
      >
        <Clock size={16} className="mr-1" />
        Weekly
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setTimeframe('monthly')}
        className={cn(
          "transition-all",
          timeframe === 'monthly' && "bg-primary text-primary-foreground"
        )}
      >
        <Calendar size={16} className="mr-1" />
        Monthly
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setTimeframe('yearly')}
        className={cn(
          "transition-all",
          timeframe === 'yearly' && "bg-primary text-primary-foreground"
        )}
      >
        <PieChart size={16} className="mr-1" />
        Yearly
      </Button>
    </div>
  );
};

export default TimeFrameToggle;
