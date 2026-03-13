import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { useAuth } from "../../contexts/AuthContext";

const springFast = {
  type: "spring",
  stiffness: 320,
  damping: 28,
  mass: 0.85,
};

const fadeSlide = {
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1],
};

export default function Login() {
  const {
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    loading,
    user,
  } = useAuth();

  const [, navigate] = useLocation();

  const [mode, setMode] = useState("login");
  const [submitting, setSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] =
    useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  const title =
    mode === "login" ? "Bem-vinda de volta" : "Crie sua conta";
  const subtitle =
    mode === "login"
      ? "Entre para acessar sua agenda, clientes e finanças."
      : "Cadastre-se e comece a organizar seu negócio com mais leveza.";

  const getErrorMessage = error => {
    const code = error?.code || "";

    if (code.includes("auth/invalid-email")) return "E-mail inválido.";
    if (code.includes("auth/user-not-found")) return "Usuário não encontrado.";
    if (code.includes("auth/wrong-password")) return "Senha incorreta.";
    if (code.includes("auth/invalid-credential"))
      return "E-mail ou senha inválidos.";
    if (code.includes("auth/email-already-in-use"))
      return "Este e-mail já está em uso.";
    if (code.includes("auth/weak-password"))
      return "A senha deve ter pelo menos 6 caracteres.";
    if (code.includes("auth/popup-closed-by-user"))
      return "O login com Google foi fechado antes de concluir.";
    if (code.includes("auth/too-many-requests"))
      return "Muitas tentativas. Tente novamente em instantes.";

    return error?.message || "Não foi possível concluir a ação.";
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    try {
      await signInWithGoogle();
      toast.success("Login realizado com Google.");
      navigate("/");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoginSubmit = async e => {
    e.preventDefault();

    if (!loginData.email.trim() || !loginData.password.trim()) {
      toast.error("Preencha e-mail e senha.");
      return;
    }

    setSubmitting(true);
    try {
      await signInWithEmail(loginData.email.trim(), loginData.password);
      toast.success("Login realizado com sucesso.");
      navigate("/");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterSubmit = async e => {
    e.preventDefault();

    if (!registerData.name.trim()) {
      toast.error("Informe seu nome.");
      return;
    }

    if (!registerData.email.trim()) {
      toast.error("Informe seu e-mail.");
      return;
    }

    if (!registerData.password) {
      toast.error("Informe sua senha.");
      return;
    }

    if (registerData.password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    setSubmitting(true);
    try {
      await signUpWithEmail(
        registerData.email.trim(),
        registerData.password,
        { name: registerData.name.trim() }
      );
      toast.success("Conta criada com sucesso.");
      navigate("/");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8efff] px-4">
        <div className="flex items-center gap-3 rounded-2xl border border-[#eddcf9] bg-white px-5 py-4 shadow-lg">
          <div className="h-3 w-3 animate-pulse rounded-full bg-[#a21caf]" />
          <span className="text-sm font-medium text-[#6b7280]">
            Carregando sua experiência...
          </span>
        </div>
      </div>
    );
  }

  const switcher = (
    <div className="relative grid h-14 grid-cols-2 rounded-full border border-[#ecd9f7] bg-[#f8effd] p-1">
      <motion.div
        className="absolute left-1 top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full bg-white shadow-[0_10px_30px_rgba(162,28,175,0.12)]"
        animate={{ x: mode === "login" ? "0%" : "100%" }}
        transition={springFast}
      />
      <button
        type="button"
        onClick={() => setMode("login")}
        className={`relative z-10 rounded-full text-sm font-semibold transition ${mode === "login"
          ? "text-[#1f1f28]"
          : "text-[#7b7287] hover:text-[#1f1f28]"
          }`}
      >
        Entrar
      </button>
      <button
        type="button"
        onClick={() => setMode("register")}
        className={`relative z-10 rounded-full text-sm font-semibold transition ${mode === "register"
          ? "text-[#1f1f28]"
          : "text-[#7b7287] hover:text-[#1f1f28]"
          }`}
      >
        Cadastrar
      </button>
    </div>
  );

  const googleButton = (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleSignIn}
      disabled={submitting || loading}
      className="h-12 w-full rounded-2xl border-[#e9d8f5] bg-white text-[#1f1f28] shadow-sm transition-all duration-200 hover:scale-[1.01] hover:bg-primary hover:shadow-md"
    >
      <span className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="h-5 w-5 shrink-0"
          aria-hidden="true"
        >
          <path
            fill="#FFC107"
            d="M43.611 20.083H42V20H24v8h11.303C33.659 32.657 29.238 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
          />
          <path
            fill="#FF3D00"
            d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.143 35.091 26.679 36 24 36c-5.217 0-9.625-3.329-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.611 20.083H42V20H24v8h11.303a12.05 12.05 0 0 1-4.084 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
          />
        </svg>

        <span className="text-sm font-medium">
          Continuar com{" "}
          <span className="font-semibold tracking-[-0.02em]">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </span>
        </span>
      </span>
    </Button>
  );

  const formContent =
    mode === "login" ? (
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#1f1f28]">E-mail</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b8396]" />
            <input
              type="email"
              placeholder="voce@exemplo.com"
              value={loginData.email}
              onChange={e =>
                setLoginData(prev => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="h-12 w-full rounded-2xl border border-[#eadcf4] bg-white pl-11 pr-4 text-sm text-[#1f1f28] outline-none transition-all duration-200 placeholder:text-[#9d97a7] focus:border-[#c026d3] focus:ring-4 focus:ring-[#c026d3]/10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#1f1f28]">Senha</label>
          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b8396]" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              value={loginData.password}
              onChange={e =>
                setLoginData(prev => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className="h-12 w-full rounded-2xl border border-[#eadcf4] bg-white pl-11 pr-12 text-sm text-[#1f1f28] outline-none transition-all duration-200 placeholder:text-[#9d97a7] focus:border-[#c026d3] focus:ring-4 focus:ring-[#c026d3]/10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b8396] transition hover:text-[#1f1f28]"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={submitting || loading}
          className="mt-2 h-12 w-full rounded-2xl bg-[linear-gradient(135deg,#c026d3,#9333ea)] text-white shadow-[0_20px_40px_rgba(168,85,247,0.28)] transition-all duration-200 hover:scale-[1.01] hover:opacity-95"
        >
          {submitting ? "Entrando..." : "Entrar agora"}
          {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>

        <div className="pt-2 text-center text-sm text-[#7b7287]">
          Ainda não tem conta?{" "}
          <button
            type="button"
            onClick={() => setMode("register")}
            className="font-semibold text-[#b025cf] transition hover:opacity-80"
          >
            Cadastre-se
          </button>
        </div>
      </form>
    ) : (
      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#1f1f28]">Nome</label>
          <div className="relative">
            <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b8396]" />
            <input
              type="text"
              placeholder="Seu nome"
              value={registerData.name}
              onChange={e =>
                setRegisterData(prev => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="h-12 w-full rounded-2xl border border-[#eadcf4] bg-white pl-11 pr-4 text-sm text-[#1f1f28] outline-none transition-all duration-200 placeholder:text-[#9d97a7] focus:border-[#c026d3] focus:ring-4 focus:ring-[#c026d3]/10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#1f1f28]">E-mail</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b8396]" />
            <input
              type="email"
              placeholder="voce@exemplo.com"
              value={registerData.email}
              onChange={e =>
                setRegisterData(prev => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="h-12 w-full rounded-2xl border border-[#eadcf4] bg-white pl-11 pr-4 text-sm text-[#1f1f28] outline-none transition-all duration-200 placeholder:text-[#9d97a7] focus:border-[#c026d3] focus:ring-4 focus:ring-[#c026d3]/10"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#1f1f28]">Senha</label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b8396]" />
              <input
                type={showRegisterPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
                value={registerData.password}
                onChange={e =>
                  setRegisterData(prev => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="h-12 w-full rounded-2xl border border-[#eadcf4] bg-white pl-11 pr-12 text-sm text-[#1f1f28] outline-none transition-all duration-200 placeholder:text-[#9d97a7] focus:border-[#c026d3] focus:ring-4 focus:ring-[#c026d3]/10"
              />
              <button
                type="button"
                onClick={() => setShowRegisterPassword(prev => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b8396] transition hover:text-[#1f1f28]"
              >
                {showRegisterPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#1f1f28]">
              Confirmar senha
            </label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b8396]" />
              <input
                type={showRegisterConfirmPassword ? "text" : "password"}
                placeholder="Repita sua senha"
                value={registerData.confirmPassword}
                onChange={e =>
                  setRegisterData(prev => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="h-12 w-full rounded-2xl border border-[#eadcf4] bg-white pl-11 pr-12 text-sm text-[#1f1f28] outline-none transition-all duration-200 placeholder:text-[#9d97a7] focus:border-[#c026d3] focus:ring-4 focus:ring-[#c026d3]/10"
              />
              <button
                type="button"
                onClick={() =>
                  setShowRegisterConfirmPassword(prev => !prev)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b8396] transition hover:text-[#1f1f28]"
              >
                {showRegisterConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={submitting || loading}
          className="mt-2 h-12 w-full rounded-2xl bg-[linear-gradient(135deg,#c026d3,#9333ea)] text-white shadow-[0_20px_40px_rgba(168,85,247,0.28)] transition-all duration-200 hover:scale-[1.01] hover:opacity-95"
        >
          {submitting ? "Criando conta..." : "Criar minha conta"}
          {!submitting && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>

        <div className="pt-2 text-center text-sm text-[#7b7287]">
          Já tem conta?{" "}
          <button
            type="button"
            onClick={() => setMode("login")}
            className="font-semibold text-[#b025cf] transition hover:opacity-80"
          >
            Entrar
          </button>
        </div>
      </form>
    );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8efff]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.85),transparent_28%),linear-gradient(135deg,#fdf7ff_0%,#f8efff_45%,#f3e8ff_100%)]" />
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#d946ef]/10 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#8b5cf6]/10 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ec4899]/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        {/* DESKTOP */}
        <div className="relative hidden h-[720px] w-full max-w-6xl overflow-hidden rounded-[36px] border border-white/60 bg-white/75 shadow-[0_30px_120px_rgba(162,28,175,0.16)] backdrop-blur-xl lg:block">
          <motion.div
            className="absolute inset-y-0 left-0 z-20 w-1/2 p-4"
            animate={{ x: mode === "login" ? "0%" : "100%" }}
            transition={springFast}
          >
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[30px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_28%),linear-gradient(135deg,#6d28d9_0%,#9333ea_45%,#db2777_100%)] p-10 text-white shadow-[0_25px_70px_rgba(147,51,234,0.28)]">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/20 bg-white/10 blur-md" />
              <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full border border-white/20 bg-white/10 blur-md" />

              <div className="relative space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                  <Sparkles className="h-4 w-4" />
                  Decola Beauty
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={fadeSlide}
                    className="space-y-4"
                  >
                    <h1 className="max-w-md text-4xl font-black leading-tight">
                      {mode === "login"
                        ? "Sua gestão de beleza em um só lugar."
                        : "Comece agora e organize sua rotina sem caos."}
                    </h1>

                    <p className="max-w-md text-base leading-7 text-white/85">
                      Agenda, clientes, serviços e financeiro com uma interface
                      bonita, rápida e pensada para quem vive da beleza.
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative space-y-4">
                <div className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
                    <ShieldCheck className="h-4 w-4" />
                    Acesso protegido
                  </div>
                  <p className="text-sm leading-6 text-white/80">
                    Login seguro, experiência fluida e painel pronto para o
                    dia a dia do seu negócio.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMode(prev => (prev === "login" ? "register" : "login"))
                  }
                  className="inline-flex items-center gap-2 rounded-2xl bg-white/15 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                >
                  {mode === "login" ? "Ainda não tem conta?" : "Já tem conta?"}
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs">
                    {mode === "login" ? "Cadastrar" : "Entrar"}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-y-0 left-0 z-10 flex w-1/2 items-center justify-center p-10 xl:p-14"
            animate={{ x: mode === "login" ? "100%" : "0%" }}
            transition={springFast}
          >
            <div className="w-full max-w-[460px]">
              {switcher}

              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, x: mode === "login" ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
                  transition={fadeSlide}
                  className="pt-8"
                >
                  <div className="mb-6">
                    <h2 className="text-4xl font-black tracking-tight text-[#1f1f28]">
                      {title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#7b7287]">
                      {subtitle}
                    </p>
                  </div>

                  <div className="mb-6">{googleButton}</div>

                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-[#eadcf4]" />
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b8396]">
                      ou continue com e-mail
                    </span>
                    <div className="h-px flex-1 bg-[#eadcf4]" />
                  </div>

                  {formContent}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* MOBILE / TABLET */}
        <div className="w-full max-w-2xl lg:hidden">
          <div className="overflow-hidden rounded-[32px] border border-white/60 bg-white/80 p-5 shadow-[0_25px_90px_rgba(162,28,175,0.14)] backdrop-blur-xl sm:p-7">
            <div className="mb-6 rounded-[28px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_28%),linear-gradient(135deg,#6d28d9_0%,#9333ea_45%,#db2777_100%)] p-6 text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Decola Beauty
              </div>

              <div className="mt-5">
                <h1 className="text-2xl font-black leading-tight">
                  {mode === "login"
                    ? "Sua gestão de beleza em um só lugar."
                    : "Crie sua conta e comece com tudo."}
                </h1>
                <p className="mt-2 text-sm leading-6 text-white/85">
                  Login rápido, visual premium e organização para sua rotina.
                </p>
              </div>
            </div>

            {switcher}

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === "login" ? 24 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === "login" ? -18 : 18 }}
                transition={fadeSlide}
                className="pt-8"
              >
                <div className="mb-6">
                  <h2 className="text-3xl font-black tracking-tight text-[#1f1f28]">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#7b7287]">
                    {subtitle}
                  </p>
                </div>

                <div className="mb-6">{googleButton}</div>

                <div className="mb-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#eadcf4]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8b8396]">
                    ou continue com e-mail
                  </span>
                  <div className="h-px flex-1 bg-[#eadcf4]" />
                </div>

                {formContent}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}