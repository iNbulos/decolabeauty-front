import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route, useLocation } from "wouter";
import { Home, Privacy, NotFound, Login, UsersPage, FragUser, Main, Unauthorized } from "./pages";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useEffect } from "react";
import CardLoading from "./components/CardLoading";

const queryClient = new QueryClient();

function AppShell({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function Portfolio() {
  return (
    <AppShell>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/privacy" component={Privacy} />

        <Route path="/401">
          <Unauthorized />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </AppShell>
  );
}

function Application() {
  return (
    <AuthProvider>
      <AppShell>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/account">
            <PrivateRoute roles={["client", "admin"]}>
              <FragUser />
            </PrivateRoute>
          </Route>

          <Route path="/admin">
            <PrivateRoute roles={["admin"]}>
              <UsersPage />
            </PrivateRoute>
          </Route>

          <Route path="/">
            <PrivateRoute roles={["client", "admin"]}>
              <Main />
            </PrivateRoute>
          </Route>

          <Route path="/401">
            <Unauthorized />
          </Route>

          <Route>
            <NotFound />
          </Route>

        </Switch>
      </AppShell>
    </AuthProvider>
  );
}


function AppRouter() {
  const dominio = window.location.hostname;

  if (dominio === "app.decolabeauty.com" || dominio === "localhost") {
    return <Application />;
  }

  if (dominio === "decolabeauty.com") {
    return <Portfolio />;
  }

  return <NotFound />
}

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
      <div className="flex h-screen items-center justify-center">
        <CardLoading />
      </div>
    );
  }

  if (!user) return null;

  if (roles && roles.length > 0 && !roles.includes(role)) {
    return null;
  }

  return children;
}


export default function App() {
  return <AppRouter />;
}