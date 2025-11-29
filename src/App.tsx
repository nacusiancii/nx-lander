import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Fooble from "./pages/Fooble";
import SearchResults from "./pages/SearchResults";
import Booktok from "./pages/Booktok";
import Comparison from "./pages/Comparison";
import Kids from "./pages/Kids";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Fooble />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/booktok" element={<Booktok />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/kids" element={<Kids />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
