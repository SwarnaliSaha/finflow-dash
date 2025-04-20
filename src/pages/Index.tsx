
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, DollarSign, PiggyBank, TrendingUp } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const Index = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleDemoLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Gradient Background */}
      <div className="navbar-gradient text-white">
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PiggyBank size={28} />
            <span className="text-xl font-bold">FinFlow</span>
          </div>
          <div className="hidden md:flex gap-4">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Features
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              About
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Contact
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-8 container mx-auto px-6 py-12">
        {/* Left Column - App Info */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Smart Financial Tracking for Everyone
            </h1>
            <p className="text-lg text-muted-foreground">
              Take control of your finances with our easy-to-use tracking and budgeting tools. See where your money goes and plan for a better future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg flex items-start space-x-3">
              <DollarSign className="text-finance-purple mt-1" size={20} />
              <div>
                <h3 className="font-medium">Expense Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Track all your expenses and categorize them automatically.
                </p>
              </div>
            </div>
            <div className="p-4 border rounded-lg flex items-start space-x-3">
              <BarChart className="text-finance-purple mt-1" size={20} />
              <div>
                <h3 className="font-medium">Budget Planning</h3>
                <p className="text-sm text-muted-foreground">
                  Create and manage budgets to control your spending.
                </p>
              </div>
            </div>
            <div className="p-4 border rounded-lg flex items-start space-x-3">
              <TrendingUp className="text-finance-purple mt-1" size={20} />
              <div>
                <h3 className="font-medium">Financial Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize your spending patterns with interactive charts.
                </p>
              </div>
            </div>
            <div className="p-4 border rounded-lg flex items-start space-x-3">
              <PiggyBank className="text-finance-purple mt-1" size={20} />
              <div>
                <h3 className="font-medium">Savings Goals</h3>
                <p className="text-sm text-muted-foreground">
                  Set goals and track your progress toward financial freedom.
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleDemoLogin}
            className="w-full md:w-auto bg-finance-purple hover:bg-finance-purple-dark flex items-center justify-center gap-2"
          >
            Try Demo
            <ArrowRight size={16} />
          </Button>
        </div>

        {/* Right Column - Auth Forms */}
        <div className="flex items-center justify-center">
          {showLogin ? (
            <LoginForm onToggleForm={toggleForm} />
          ) : (
            <SignupForm onToggleForm={toggleForm} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
