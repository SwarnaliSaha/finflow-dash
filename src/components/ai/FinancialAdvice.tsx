import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart, PieChart, TrendingUp, Info, HelpCircle } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';
import { useNavigate } from 'react-router-dom';

const FinancialAdvice = () => {
  const { totalIncome, totalExpenses, getExpensesByCategory } = useFinance();
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  
  const expensesByCategory = getExpensesByCategory();
  const savingsRate = totalIncome > 0 ? Math.round((totalIncome - totalExpenses) / totalIncome * 100) : 0;
  
  const getBudgetingAdvice = () => {
    if (savingsRate < 10) {
      return "Your savings rate is below 10%, which might be risky long-term. Consider following the 50/30/20 rule: 50% of income for necessities, 30% for wants, and 20% for savings/debt.";
    } else if (savingsRate < 20) {
      return "Your savings rate is good, but could be improved. Try to increase it gradually to 20% for better long-term financial health.";
    } else {
      return "Great job! Your savings rate is above 20%, which puts you on track for financial security. Consider investing these savings for long-term growth.";
    }
  };
  
  const getSpendingAdvice = () => {
    let highestCategory = { name: '', value: 0 };
    
    expensesByCategory.forEach(category => {
      if (category.value > highestCategory.value) {
        highestCategory = category;
      }
    });
    
    if (highestCategory.name) {
      const percentOfTotal = Math.round((highestCategory.value / totalExpenses) * 100);
      if (percentOfTotal > 40) {
        return `Your ${highestCategory.name} spending accounts for ${percentOfTotal}% of your expenses, which is significantly higher than recommended. Consider ways to reduce this expense.`;
      } else {
        return `Your spending seems well-distributed, with ${highestCategory.name} as your highest category at ${percentOfTotal}% of total expenses.`;
      }
    }
    
    return "Add more transactions to get personalized spending advice.";
  };
  
  const getSavingsAdvice = () => {
    if (totalIncome <= totalExpenses) {
      return "You're currently spending more than or equal to your income. Create an emergency fund by cutting non-essential expenses.";
    } else if (savingsRate < 15) {
      return "Aim to increase your savings to at least 15% of income. Consider automating transfers to a separate savings account.";
    } else {
      return "You're saving well! Consider diversifying your savings into different investment vehicles based on your time horizon and risk tolerance.";
    }
  };

  return (
    <Card className="border-finance-purple/20 bg-gradient-to-br from-white to-finance-purple/5">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-finance-purple">AI Financial Assistant</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setShowDetails(!showDetails)}>
            <HelpCircle size={18} className="text-muted-foreground" />
          </Button>
        </div>
        <CardDescription>
          Personalized suggestions based on your financial data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm leading-relaxed">{getBudgetingAdvice()}</p>
        </div>
        
        {showDetails && (
          <Tabs defaultValue="budgeting" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="budgeting">Budgeting</TabsTrigger>
              <TabsTrigger value="spending">Spending</TabsTrigger>
              <TabsTrigger value="savings">Savings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="budgeting" className="space-y-4 pt-3">
              <div className="flex items-start gap-2">
                <BarChart size={18} className="text-finance-purple mt-1" />
                <div>
                  <h4 className="font-medium">Budget Optimization</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The 50/30/20 rule suggests allocating 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info size={18} className="text-finance-purple mt-1" />
                <div>
                  <h4 className="font-medium">Action Items</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Review your monthly fixed expenses</li>
                    <li>Look for subscription services you no longer use</li>
                    <li>Create category-specific budget caps</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="spending" className="space-y-4 pt-3">
              <div className="flex items-start gap-2">
                <PieChart size={18} className="text-finance-purple mt-1" />
                <div>
                  <h4 className="font-medium">Spending Analysis</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {getSpendingAdvice()}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info size={18} className="text-finance-purple mt-1" />
                <div>
                  <h4 className="font-medium">Tips to Reduce Spending</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Use the 24-hour rule before making non-essential purchases</li>
                    <li>Meal plan to reduce food costs</li>
                    <li>Consider bundling services for discounts</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="savings" className="space-y-4 pt-3">
              <div className="flex items-start gap-2">
                <TrendingUp size={18} className="text-finance-purple mt-1" />
                <div>
                  <h4 className="font-medium">Savings Strategy</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {getSavingsAdvice()}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info size={18} className="text-finance-purple mt-1" />
                <div>
                  <h4 className="font-medium">Savings Hierarchy</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Build an emergency fund (3-6 months of expenses)</li>
                    <li>Pay off high-interest debt</li>
                    <li>Contribute to retirement accounts</li>
                    <li>Save for other financial goals</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
        
        {!showDetails && (
          <div className="flex flex-col gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 text-xs w-full bg-white hover:bg-finance-purple/10"
              onClick={() => setShowDetails(true)}
            >
              View Detailed Analysis
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="text-xs w-full bg-finance-purple/10 hover:bg-finance-purple/20"
              onClick={() => navigate("/financial-advice")}
            >
              Drill Down &amp; See All Insights
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialAdvice;
