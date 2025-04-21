
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, DollarSign, PiggyBank, TrendingUp } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const Index = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleDemoLogin = () => {
    navigate('/dashboard');
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={() => scrollToSection('features')}
            >
              Features
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={() => scrollToSection('about')}
            >
              About
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={() => scrollToSection('contact')}
            >
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

          {/* Features Section */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-2 gap-4 scroll-mt-20">
            <div className="p-4 border rounded-lg flex items-start space-x-3 hover:bg-muted/50 transition-colors">
              <DollarSign className="text-finance-purple mt-1" size={20} />
              <div>
                <h3 className="font-medium">Expense Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Track all your expenses and categorize them automatically.
                </p>
              </div>
            </div>
            <div className="p-4 border rounded-lg flex items-start space-x-3 hover:bg-muted/50 transition-colors">
              <BarChart className="text-finance-purple mt-1" size={20} />
              <div>
                <h3 className="font-medium">Budget Planning</h3>
                <p className="text-sm text-muted-foreground">
                  Create and manage budgets to control your spending.
                </p>
              </div>
            </div>
            <div className="p-4 border rounded-lg flex items-start space-x-3 hover:bg-muted/50 transition-colors">
              <TrendingUp className="text-finance-purple mt-1" size={20} />
              <div>
                <h3 className="font-medium">Financial Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Visualize your spending patterns with interactive charts.
                </p>
              </div>
            </div>
            <div className="p-4 border rounded-lg flex items-start space-x-3 hover:bg-muted/50 transition-colors">
              <PiggyBank className="text-finance-purple mt-1" size={20} />
              <div>
                <h3 className="font-medium">Savings Goals</h3>
                <p className="text-sm text-muted-foreground">
                  Set goals and track your progress toward financial freedom.
                </p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div id="about" className="space-y-4 scroll-mt-20">
            <h2 className="text-2xl font-bold">About FinFlow</h2>
            <p className="text-muted-foreground">
              FinFlow is a comprehensive financial management application designed to help individuals and small businesses 
              track expenses, set budgets, and achieve financial goals. Our intuitive dashboards and reports make it easy 
              to visualize your financial health at a glance.
            </p>
          </div>

          {/* Contact Section */}
          <div id="contact" className="space-y-4 scroll-mt-20">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <p className="text-muted-foreground">
              Have questions about FinFlow? We'd love to hear from you! 
              Reach out at <span className="text-finance-purple">support@finflow.com</span> or 
              call us at <span className="text-finance-purple">(555) 123-4567</span>.
            </p>
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
