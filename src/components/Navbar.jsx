import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Rocket } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { role, user } = useAuth();
  const isHome = location === "/";


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/80 backdrop-blur-xl shadow-card border-b border-border"
        : "bg-transparent"
        }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
          <img
            src="https://decolabeauty.com/media/logo-decolabeauty.png"
            alt="Decola Beauty"
            className="h-6 w-auto object-contain"
          />
          <span className="text-gradient-primary">Decola Beauty</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {isHome ? (
            <>
              <a href="#funcionalidades" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Funcionalidades
              </a>
              <a href="#beneficios" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Benefícios
              </a>
            </>
          ) : (
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Início
            </Link>
          )}
          <div className="inline-flex items-center gap-1.5 rounded-xl bg-secondary/15 border border-secondary/30 px-4 py-1.5 text-sm font-medium text-secondary">
            <Rocket className="h-4 w-4 animate-bounce" />
            Em Breve
          </div>
          {role === "admin" && (
            <button type="button" onClick={() => setLocation("admin")} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-secondary/80 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-secondary/20 transition-all duration-200 hover:scale-105 hover:shadow-secondary/40 hover:-translate-y-0.5 active:scale-95">
              <span>Admin</span>
            </button>
          )}
          <button type="button" onClick={() => setLocation("account")} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-secondary/80 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-secondary/20 transition-all duration-200 hover:scale-105 hover:shadow-secondary/40 hover:-translate-y-0.5 active:scale-95">
            <span>{
              user?.displayName ? user.displayName : (user ? "Conta" : "Entrar")
            }</span>
          </button>

          <button type="button" onClick={() => setLocation("application")} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-secondary/80 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-secondary/20 transition-all duration-200 hover:scale-105 hover:shadow-secondary/40 hover:-translate-y-0.5 active:scale-95">
            <span>Acessar meu painel</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-4 pb-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="flex flex-col gap-3">
            {isHome ? (
              <>
                <a
                  href="#funcionalidades"
                  className="text-sm text-muted-foreground hover:text-foreground py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Funcionalidades
                </a>
                <a
                  href="#beneficios"
                  className="text-sm text-muted-foreground hover:text-foreground py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Benefícios
                </a>
              </>
            ) : (
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-foreground py-2"
                onClick={() => setMobileOpen(false)}
              >
                Início
              </Link>
            )}
            <div className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-secondary/15 border border-secondary/30 px-4 py-2 text-sm font-medium text-secondary">
              <Rocket className="h-3.5 w-3.5" />
              Lançamento em Breve
            </div>

            {role === "admin" && (
              <button type="button" onClick={() => setLocation("admin")} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-secondary/80 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-secondary/20 transition-all duration-200 hover:scale-105 hover:shadow-secondary/40 hover:-translate-y-0.5 active:scale-95">
                <span>Admin</span>
              </button>
            )}
            <button type="button" onClick={() => setLocation("account")} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-secondary/80 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-secondary/20 transition-all duration-200 hover:scale-105 hover:shadow-secondary/40 hover:-translate-y-0.5 active:scale-95">
              <span>{
                user?.displayName ? user.displayName : (user ? "Conta" : "Entrar")
              }</span>
            </button>
            <button type="button" onClick={() => setLocation("application")} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-secondary/80 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-secondary/20 transition-all duration-200 hover:scale-105 hover:shadow-secondary/40 hover:-translate-y-0.5 active:scale-95">
              <span>Acessar meu painel</span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
