import { motion } from "framer-motion";
import { Rocket, Bell } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Bell className="mr-1.5 h-4 w-4" />
            Baixe na Google Play ou acesse pela web.
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl mb-4">
            Pronto para{" "}
            <span className="text-gradient-primary">decolar?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            O Decola Beauty já está disponível. Uma forma simples e inteligente de gerenciar seu negócio de beleza.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.module.decolabeauty&hl=pt_BR"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-secondary/80 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-secondary/20 transition-all duration-200 hover:scale-105 hover:shadow-secondary/40 hover:-translate-y-0.5 active:scale-95">
            <Rocket className="h-4 w-4 animate-bounce" />
            Quero decolar!
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
