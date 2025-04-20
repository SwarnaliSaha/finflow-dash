
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FinanceProvider } from "./context/FinanceContext";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Reports from "./pages/Reports";
import Monthly from "./pages/Monthly";
import Yearly from "./pages/Yearly";
import Weekly from "./pages/Weekly";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <FinanceProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Dashboard Routes */}
              <Route path="/" element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/budgets" element={<Budgets />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/monthly" element={<Monthly />} />
                <Route path="/yearly" element={<Yearly />} />
                <Route path="/weekly" element={<Weekly />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </FinanceProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
