import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Rocket } from "lucide-react";
import { Link, useLocation } from "wouter";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location  === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
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
            <Rocket className="h-3.5 w-3.5" />
            Em Breve
          </div>
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
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
