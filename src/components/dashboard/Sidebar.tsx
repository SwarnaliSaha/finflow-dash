
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  Home,
  LogOut,
  PiggyBank,
  User,
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
}

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
      active
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="hidden md:flex h-screen border-r flex-col space-y-6 p-4 w-64">
      <div className="flex items-center gap-2 px-2 py-2">
        <PiggyBank size={24} className="text-finance-purple" />
        <span className="text-xl font-bold">FinFlow</span>
      </div>
      
      <nav className="flex-1 space-y-1">
        <SidebarItem 
          icon={<Home size={20} />} 
          label="Dashboard" 
          href="/dashboard" 
          active={isActive('/dashboard')} 
        />
        <SidebarItem 
          icon={<CreditCard size={20} />} 
          label="Transactions" 
          href="/transactions" 
          active={isActive('/transactions')} 
        />
        <SidebarItem 
          icon={<DollarSign size={20} />} 
          label="Budgets" 
          href="/budgets" 
          active={isActive('/budgets')} 
        />
        <SidebarItem 
          icon={<BarChart3 size={20} />} 
          label="Reports" 
          href="/reports" 
          active={isActive('/reports')} 
        />
        <SidebarItem 
          icon={<Calendar size={20} />} 
          label="Monthly View" 
          href="/monthly" 
          active={isActive('/monthly')} 
        />
        <SidebarItem 
          icon={<PieChart size={20} />} 
          label="Yearly View" 
          href="/yearly" 
          active={isActive('/yearly')} 
        />
        <SidebarItem 
          icon={<Clock size={20} />} 
          label="Weekly View" 
          href="/weekly" 
          active={isActive('/weekly')} 
        />
        <SidebarItem 
          icon={<User size={20} />} 
          label="Profile" 
          href="/profile" 
          active={isActive('/profile')} 
        />
      </nav>
      
      <div className="border-t pt-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground" 
          onClick={logout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
