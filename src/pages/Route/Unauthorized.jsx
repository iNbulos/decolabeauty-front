import { useLocation } from "wouter";
import { useEffect } from "react";
import { ArrowLeft, Home, Lock, LogIn, ShieldAlert, Sparkles } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function Unauthorized() {
  const [location] = useLocation();
  const { user } = useAuth();

  const isAuthenticated = !!user;
  const primaryActionHref = isAuthenticated ? "/" : "/login";
  const primaryActionLabel = isAuthenticated ? "Voltar para o início" : "Fazer login";
  const PrimaryActionIcon = isAuthenticated ? Home : LogIn;

  useEffect(() => {
    console.error("401 Error: Unauthorized access attempt to:", location, {
      authenticated: isAuthenticated,
      user,
    });
  }, [location, isAuthenticated, user]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero-gradient px-4 py-10">
      <div className="absolute left-[-80px] top-[-80px] h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-[-100px] right-[-80px] h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_45%)]" />

      <section className="relative z-10 w-full max-w-3xl rounded-[2rem] border border-white/50 bg-background/85 p-6 shadow-glow-lg backdrop-blur md:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            Acesso restrito
          </div>

          <div className="mb-4 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary shadow-glow">
              <Lock className="h-11 w-11 text-white" />
            </div>
          </div>

          <div className="mb-3">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-[3.5rem] font-black leading-none tracking-[-0.08em] text-transparent md:text-[5rem]">
              401
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
            {isAuthenticated
              ? "Você está logado, mas não tem permissão."
              : "Você precisa entrar para continuar."}
          </h1>

          <p className="mx-auto mb-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
            {isAuthenticated
              ? "Sua conta foi autenticada, mas este recurso exige um nível de acesso diferente."
              : "Esta área é protegida e exige autenticação. Sua sessão pode não existir, ter expirado, ou você caiu aqui antes de fazer login."}
          </p>

          <div className="mx-auto mb-8 flex max-w-xl items-start gap-3 rounded-2xl border border-border bg-card/80 p-4 text-left shadow-card">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Recurso solicitado
              </p>
              <code className="mt-1 block break-all rounded-xl bg-muted px-3 py-2 text-sm text-muted-foreground">
                {location}
              </code>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={primaryActionHref}
              className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:-translate-y-0.5 hover:opacity-95"
            >
              <PrimaryActionIcon className="h-4 w-4" />
              {primaryActionLabel}
            </a>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            {isAuthenticated
              ? "Entre em contato com um administrador caso este acesso devesse estar liberado."
              : "Entre com uma conta autorizada para acessar esta página."}
          </p>
        </div>
      </section>
    </main>
  );
};
 