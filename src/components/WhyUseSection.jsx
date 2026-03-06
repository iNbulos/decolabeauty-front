import { motion } from "framer-motion";
import { Check, Cloud, CreditCard, TrendingUp } from "lucide-react"; // Adicionado TrendingUp aqui

const benefits = [
  {
    icon: CreditCard,
    title: "Sem mensalidades abusivas",
    description: "Use todas as funcionalidades sem surpresas na fatura.",
  },
  {
    icon: TrendingUp, // Agora o ícone funcionará corretamente
    title: "Relatórios de Crescimento",
    description: "Acompanhe seu faturamento mensal e descubra quem são seus melhores clientes.",
  },
  {
    icon: Cloud,
    title: "Backup automático",
    description: "Seus dados estão sempre seguros e protegidos na nuvem.",
  },
];

const WhyUseSection = () => {
  return (
    <section className="py-20 md:py-28 bg-surface-variant">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl mb-4">
            Por que usar o{" "}
            <span className="text-gradient-primary">Decola Beauty?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Feito por quem entende a rotina dos profissionais da beleza.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shadow-glow">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="mb-2 flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <h3 className="text-lg font-bold text-foreground">
                  {benefit.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUseSection;
