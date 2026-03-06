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
            Novidades em breve
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl mb-4">
            Pronto para{" "}
            <span className="text-gradient-primary">decolar?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            Estamos finalizando o Decola Beauty para você. Em breve, a gestão do
            seu negócio de beleza será muito mais simples.
          </p>
          <div className="inline-flex items-center gap-2 rounded-2xl bg-secondary/15 border border-secondary/30 px-8 py-4 text-lg font-semibold text-secondary animate-pulse-glow">
            <Rocket className="h-5 w-5" />
            Em Desenvolvimento
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
