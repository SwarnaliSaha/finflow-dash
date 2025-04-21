
import { useMemo, useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { format, parseISO } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Search, Trash2 } from 'lucide-react';
import { Transaction } from '@/types';
import { cn } from '@/lib/utils';

type SortField = 'date' | 'amount' | 'category' | 'description';
type SortDirection = 'asc' | 'desc';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  const { deleteTransaction } = useFinance();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) return transactions;
    
    const query = searchQuery.toLowerCase();
    return transactions.filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query) ||
        transaction.amount.toString().includes(query) ||
        transaction.date.includes(query)
    );
  }, [transactions, searchQuery]);

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      let result = 0;

      switch (sortField) {
        case 'date':
          result = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'amount':
          result = a.amount - b.amount;
          break;
        case 'category':
          result = a.category.localeCompare(b.category);
          break;
        case 'description':
          result = a.description.localeCompare(b.description);
          break;
      }

      return sortDirection === 'asc' ? result : -result;
    });
  }, [filteredTransactions, sortField, sortDirection]);

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'MMM dd, yyyy');
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Search transactions..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort('date')}>
                <div className="flex items-center gap-1">
                  Date <SortIcon field="date" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('description')}>
                <div className="flex items-center gap-1">
                  Description <SortIcon field="description" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('category')}>
                <div className="flex items-center gap-1">
                  Category <SortIcon field="category" />
                </div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort('amount')}>
                <div className="flex items-center gap-1 justify-end">
                  Amount <SortIcon field="amount" />
                </div>
              </TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransactions.length > 0 ? (
              sortedTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover-scale-subtle transition-all">
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <span className="bg-muted px-2 py-1 rounded-full text-xs">
                      {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell className={cn(
                    "text-right font-medium",
                    transaction.type === 'income' ? "text-finance-income" : "text-finance-expense"
                  )}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTransaction(transaction.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 size={16} className="text-muted-foreground hover:text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionList;
