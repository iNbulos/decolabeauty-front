import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route, useLocation } from "wouter";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import Login from "./pages/RoutePages/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";

const queryClient = new QueryClient();

function PrivateRoute({ children, roles }) {
  const { user, loading, role } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    if (roles && roles.length > 0 && !roles.includes(role)) {
      navigate("/401");
    }
  }, [loading, user, role, roles, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-700">
        Carregando...
      </div>
    );
  }

  if (!user) return null;

  if (roles && roles.length > 0 && !roles.includes(role)) {
    return null;
  }

  return children;
}


const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <Switch>
          <Route path="/" component={Index} />
          <Route path="/privacy" component={Privacy} />

          <Route path="/login" component={Login} />

          {/* Admin protegido */}
          <Route path="/admin">
            <PrivateRoute roles={["admin"]}>
              <h1>Admin Panel</h1>
            </PrivateRoute>
          </Route>

          {/* 404 */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
