
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LineChart from '@/components/charts/LineChart';
import PieChart from '@/components/charts/PieChart';
import BarChart from '@/components/charts/BarChart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const FinancialAdviceDetails = () => {
  const navigate = useNavigate();
  const {
    totalIncome,
    totalExpenses,
    getMonthlyData,
    getWeeklyData,
    getExpensesByCategory,
    getIncomesByCategory,
    transactions,
    timeframe
  } = useFinance();

  const savings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.round((savings / totalIncome) * 100) : 0;
  const monthlyData = getMonthlyData();
  const expensesByCategory = getExpensesByCategory();
  const incomesByCategory = getIncomesByCategory();
  const pieColors = [
    '#9b87f5', '#7E69AB', '#E5DEFF', '#6E59A5', '#D3E4FD', 
    '#33C3F0', '#8B5CF6', '#1EAEDB', '#0FA0CE', '#d1d1e0'
  ];

  const advice = [
    {
      title: "Budgeting Strategy",
      text: `Consider allocating your income using the 50/30/20 rule: 50% needs, 30% wants, 20% savings. Your current savings rate is ${savingsRate}%. Aim for at least 15-20% savings.`,
    },
    {
      title: "Spending Insights",
      text: `Your highest spending category is "${
        expensesByCategory[0]?.name || "N/A"
      }". Focus on reducing variable expenses.`,
    },
    {
      title: "Income Overview",
      text: `You are generating most income from "${
        incomesByCategory[0]?.name || "N/A"
      }". Diversifying income streams can strengthen your finances.`,
    },
    {
      title: "Expense Analysis",
      text: `Track recurring expenses and set budget limits for categories where possible.`,
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-finance-purple">In-Depth Financial Insight</h1>
          <p className="text-muted-foreground mt-1">
            Explore detailed AI-powered financial advice based on your data
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {advice.map((item) => (
          <Card key={item.title} className="animated-card">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="animated-card">
          <CardHeader>
            <CardTitle>Income vs. Expenses (Monthly)</CardTitle>
            <CardDescription>Review your cash flow trends and savings monthly.</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={monthlyData}
              xKey="month"
              lines={[
                { key: 'income', color: '#4ade80' },
                { key: 'expense', color: '#f87171' },
                { key: 'savings', color: '#9b87f5', strokeDasharray: '5 5' }
              ]}
              height={250}
            />
          </CardContent>
        </Card>
        <Card className="animated-card">
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>Breakdown of expenses by category.</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart data={expensesByCategory} colors={pieColors} height={250} />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="animated-card">
          <CardHeader>
            <CardTitle>Bar Chart: Monthly Comparison</CardTitle>
            <CardDescription>Income, Expenses, Savings per month.</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={monthlyData}
              xKey="month"
              dataKeys={[
                { key: 'income', color: '#4ade80' },
                { key: 'expense', color: '#f87171' },
                { key: 'savings', color: '#9b87f5' }
              ]}
              height={250}
            />
          </CardContent>
        </Card>
        <Card className="animated-card">
          <CardHeader>
            <CardTitle>Income by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart data={incomesByCategory} colors={pieColors.slice(4).concat(pieColors.slice(0, 4))} height={250} />
          </CardContent>
        </Card>
      </div>

      <Card className="animated-card">
        <CardHeader>
          <CardTitle>Recent Transactions Table</CardTitle>
          <CardDescription>Your 10 most recent transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.slice(0, 10).map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.date}</TableCell>
                    <TableCell>{t.description}</TableCell>
                    <TableCell>{t.category}</TableCell>
                    <TableCell>
                      <span className={t.type === 'income' ? 'text-finance-income' : 'text-finance-expense'}>
                        {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      ${t.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialAdviceDetails;
