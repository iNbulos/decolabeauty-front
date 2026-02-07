import { MessageCircle, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-surface-variant py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
              <img
                src="https://decolabeauty.com/media/logo-decolabeauty.png"
                alt="Decola Beauty"
                className="h-6 w-auto object-contain"
              />
              <span className="text-gradient-primary">Decola Beauty</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Gestão inteligente para profissionais da beleza.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            <Link
              to="/privacy"
              className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
            >
              <Shield className="h-4 w-4" />
              Política de Privacidade
            </Link>
            <a
              href="https://wa.me/554196129534"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:brightness-110 transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Decola Beauty. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
