import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IndexV2 from "./pages/IndexV2";
import IndexV3 from "./pages/IndexV3";
import NatalLanding from "./pages/NatalLanding";
import NatalLandingV1 from "./pages/NatalLandingV1";
import NatalLandingV2 from "./pages/NatalLandingV2";
import NotFound from "./pages/NotFound";
import AdminEmails from "./pages/AdminEmails";
import CheckoutBridge from "./pages/CheckoutBridge";
import BackgroundRemover from "./pages/BackgroundRemover";
import MentoriaLanding from "./pages/MentoriaLanding";
import Relatorio from "./pages/Relatorio";
import MaintenancePage from "./components/MaintenancePage";

const queryClient = new QueryClient();

// Verificar se o modo manutenção está ativado
const isMaintenanceMode = false; // import.meta.env.VITE_MAINTENANCE_MODE === 'true';

// Domínio dedicado da campanha de Natal: mostra a NatalLanding na raiz "/",
// mantendo todos os outros hosts (imersão, previews *.vercel.app) com o comportamento normal.
const NATAL_HOSTNAME = "cronogramadenatal.inovandonasuaobra.com.br";

const RootRoute = () => {
  if (typeof window !== "undefined" && window.location.hostname === NATAL_HOSTNAME) {
    return <NatalLanding />;
  }
  return <Index />;
};

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
          <Route path="/" element={<RootRoute />} />
          <Route path="/v2" element={<IndexV2 />} />
          <Route path="/v3" element={<IndexV3 />} />
          <Route path="/natal" element={<NatalLanding />} />
          <Route path="/natal-v1" element={<NatalLandingV1 />} />
          <Route path="/natal-v2" element={<NatalLandingV2 />} />
          <Route path="/natal-v2/pergunta-1" element={<NatalLandingV2 />} />
          <Route path="/natal-v2/pergunta-2" element={<NatalLandingV2 />} />
          <Route path="/natal-v2/perfil" element={<NatalLandingV2 />} />
          <Route path="/natal-v2/video" element={<NatalLandingV2 />} />
          <Route path="/natal-v2/depoimentos" element={<NatalLandingV2 />} />
          <Route path="/mentoria" element={<MentoriaLanding />} />
          <Route path="/admin/emails" element={<AdminEmails />} />
          <Route path="/checkout/:product" element={<CheckoutBridge />} />
          <Route path="/tools/background-remover" element={<BackgroundRemover />} />
          <Route path="/relatorio" element={<Relatorio />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
