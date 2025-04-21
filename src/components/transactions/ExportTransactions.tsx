
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Download } from 'lucide-react';
import { Transaction } from '@/types';

interface ExportTransactionsProps {
  transactions: Transaction[];
}

type ExportFormat = 'csv' | 'json' | 'pdf';

const ExportTransactions = ({ transactions }: ExportTransactionsProps) => {
  const [exportFormat, setExportFormat] = useState<ExportFormat>('csv');
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = () => {
    // Convert transactions to selected format
    let dataStr: string = '';
    let fileName: string = `finflow-transactions-${new Date().toISOString().split('T')[0]}`;
    
    switch (exportFormat) {
      case 'csv':
        // Create CSV content
        const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
        const csvRows = [headers];
        
        transactions.forEach(t => {
          csvRows.push([
            t.date, 
            t.description, 
            t.category, 
            t.type, 
            t.amount.toString()
          ]);
        });
        
        dataStr = csvRows.map(row => row.join(',')).join('\n');
        fileName += '.csv';
        break;
        
      case 'json':
        dataStr = JSON.stringify(transactions, null, 2);
        fileName += '.json';
        break;
        
      case 'pdf':
        // In a real app, you would use a library like jsPDF
        // For this demo, we'll just notify the user
        toast({
          title: "PDF Export",
          description: "In a production app, this would generate a PDF file.",
        });
        setIsOpen(false);
        return;
    }
    
    // Create and trigger download
    const blob = new Blob([dataStr], { type: exportFormat === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: `Your transactions have been exported as ${exportFormat.toUpperCase()}.`,
    });
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Download size={16} />
          <span>Export</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Transactions</DialogTitle>
          <DialogDescription>
            Choose a format to export your transaction data.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Select value={exportFormat} onValueChange={(value) => setExportFormat(value as ExportFormat)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV (Excel)</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="pdf">PDF Document</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              {exportFormat === 'csv' && "Export to CSV for easy import into spreadsheet applications like Excel or Google Sheets."}
              {exportFormat === 'json' && "Export to JSON format for use in other applications or for backup purposes."}
              {exportFormat === 'pdf' && "Export to PDF for a nicely formatted document that's easy to print or share."}
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleExport}>Export {transactions.length} Transactions</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportTransactions;
