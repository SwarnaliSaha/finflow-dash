
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  Home,
  LogOut,
  Menu,
  PiggyBank,
  User,
} from 'lucide-react';

interface MobileNavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
  onClick: () => void;
}

const MobileNavItem = ({ icon, label, href, active, onClick }: MobileNavItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
      active
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    )}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const MobileNav = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <div className="md:hidden navbar-gradient text-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <PiggyBank size={24} />
        <span className="text-xl font-bold">FinFlow</span>
      </div>
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 p-4 border-b">
              <PiggyBank size={24} className="text-finance-purple" />
              <span className="text-xl font-bold">FinFlow</span>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              <MobileNavItem 
                icon={<Home size={20} />} 
                label="Dashboard" 
                href="/dashboard" 
                active={isActive('/dashboard')} 
                onClick={handleNavClick}
              />
              <MobileNavItem 
                icon={<CreditCard size={20} />} 
                label="Transactions" 
                href="/transactions" 
                active={isActive('/transactions')} 
                onClick={handleNavClick}
              />
              <MobileNavItem 
                icon={<DollarSign size={20} />} 
                label="Budgets" 
                href="/budgets" 
                active={isActive('/budgets')} 
                onClick={handleNavClick}
              />
              <MobileNavItem 
                icon={<BarChart3 size={20} />} 
                label="Reports" 
                href="/reports" 
                active={isActive('/reports')} 
                onClick={handleNavClick}
              />
              <MobileNavItem 
                icon={<Calendar size={20} />} 
                label="Monthly View" 
                href="/monthly" 
                active={isActive('/monthly')} 
                onClick={handleNavClick}
              />
              <MobileNavItem 
                icon={<PieChart size={20} />} 
                label="Yearly View" 
                href="/yearly" 
                active={isActive('/yearly')} 
                onClick={handleNavClick}
              />
              <MobileNavItem 
                icon={<Clock size={20} />} 
                label="Weekly View" 
                href="/weekly" 
                active={isActive('/weekly')} 
                onClick={handleNavClick}
              />
              <MobileNavItem 
                icon={<User size={20} />} 
                label="Profile" 
                href="/profile" 
                active={isActive('/profile')} 
                onClick={handleNavClick}
              />
            </nav>
            
            <div className="border-t p-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground" 
                onClick={() => {
                  logout();
                  handleNavClick();
                }}
              >
                <LogOut size={20} />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
