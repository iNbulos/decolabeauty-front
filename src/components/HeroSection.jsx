import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              ✨ App para profissionais da beleza
            </div>
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Decole seu negócio de beleza com{" "}
              <span className="text-gradient-primary">gestão inteligente.</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg text-muted-foreground md:text-xl lg:mx-0 mx-auto">
              Agenda, financeiro e clientes na palma da sua mão. Simplifique sua
              rotina e foque no que você faz de melhor.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row lg:justify-start justify-center">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-secondary/15 border border-secondary/30 px-6 py-3 text-lg font-semibold text-secondary">
                <Rocket className="h-5 w-5" />
                Lançamento em Breve
              </div>
              <span className="text-sm text-muted-foreground">
                Fique atento às novidades!
              </span>
            </div>
          </motion.div>


        </div>
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-48 w-48 rounded-full bg-secondary/5 blur-3xl" />
    </section>
  );
};


