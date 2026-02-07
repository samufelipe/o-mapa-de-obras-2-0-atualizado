import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminEmails from "./pages/AdminEmails";
import CheckoutBridge from "./pages/CheckoutBridge";
import BackgroundRemover from "./pages/BackgroundRemover";
import MentoriaLanding from "./pages/MentoriaLanding";
import MaintenancePage from "./components/MaintenancePage";

const queryClient = new QueryClient();

// Verificar se o modo manutenção está ativado
const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === 'true';

const App = () => {
  // Se modo manutenção estiver ativado, mostrar apenas a página de manutenção
  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mentoria" element={<MentoriaLanding />} />
          <Route path="/admin/emails" element={<AdminEmails />} />
          <Route path="/checkout/:product" element={<CheckoutBridge />} />
          <Route path="/tools/background-remover" element={<BackgroundRemover />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
