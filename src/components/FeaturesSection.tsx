import { motion } from "framer-motion";
import { Calendar, DollarSign, Users, Tag } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Agenda Inteligente",
    description: "Organize seus horários e evite conflitos. Receba lembretes automáticos.",
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    span: "md:col-span-2",
  },
  {
    icon: DollarSign,
    title: "Controle Financeiro",
    description: "Controle receitas e despesas facilmente. Relatórios claros e simples.",
    colorClass: "text-secondary",
    bgClass: "bg-secondary/10",
    span: "md:col-span-1",
  },
  {
    icon: Users,
    title: "Base de Clientes",
    description: "Histórico completo e fidelização. Conheça seus clientes como nunca.",
    colorClass: "text-accent",
    bgClass: "bg-accent/10",
    span: "md:col-span-1",
  },
  {
    icon: Tag,
    title: "Serviços & Preços",
    description: "Cadastre serviços e preços personalizados. Tabelas acessíveis e organizadas.",
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
    span: "md:col-span-2",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl mb-4">
            Tudo que você precisa, <span className="text-gradient-primary">em um só app.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ferramentas pensadas para profissionais da beleza que querem crescer.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className={`${feature.span} group relative rounded-3xl bg-card border border-border p-7 md:p-8 shadow-card hover:shadow-glow transition-all duration-300 cursor-default`}
            >
              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${feature.bgClass}`}
              >
                <feature.icon className={`h-6 w-6 ${feature.colorClass}`} />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
