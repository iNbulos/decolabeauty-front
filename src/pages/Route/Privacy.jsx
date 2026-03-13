import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import Navbar from "../../components/portfolio/Navbar";
import Footer from "../../components/portfolio/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto max-w-4xl rounded-3xl bg-card p-8 md:p-12 shadow-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-foreground md:text-4xl mb-2">
              Política de Privacidade do{" "}
              <span className="text-gradient-primary">Decola Beauty</span>
            </h1>
            <p className="text-muted-foreground mb-10 text-lg">
              Vigência a partir de 01 de Janeiro de 2024
            </p>

            <div className="prose-privacy space-y-8 text-foreground leading-relaxed">
              {/* 1 */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">1. Introdução</h2>
                <p className="text-foreground/85">
                  O aplicativo <strong>Decola Beauty</strong> ("nós", "nosso") compromete-se a proteger a privacidade dos seus usuários ("você", "profissional"). Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos as informações no seu dispositivo móvel.
                </p>
              </section>

              {/* 2 */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">2. Dados que Coletamos</h2>
                <p className="text-foreground/85 mb-4">
                  Para o funcionamento pleno da gestão do seu negócio de beleza, o aplicativo pode coletar e processar os seguintes dados:
                </p>
                <ul className="space-y-3 pl-1">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span><strong>Informações de Cadastro de Clientes:</strong> Nomes, números de telefone e anotações sobre preferências de serviço que você insere manualmente.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span><strong>Dados Financeiros:</strong> Registros de receitas, despesas e preços de serviços inseridos por você para controle de caixa.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span><strong>Dados da Agenda:</strong> Horários, datas e durações de agendamentos.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span><strong>Informações do Dispositivo:</strong> Modelo do aparelho e versão do sistema operacional (para fins de correção de bugs e analytics anônimo).</span>
                  </li>
                </ul>
              </section>

              {/* 3 */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">3. Como Usamos seus Dados</h2>
                <p className="text-foreground/85 mb-4">
                  Utilizamos as informações coletadas estritamente para:
                </p>
                <ul className="space-y-3 pl-1">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span>Permitir o gerenciamento da sua agenda e base de clientes.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span>Gerar relatórios financeiros e de desempenho do seu negócio.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span>Facilitar a comunicação com seus clientes via WhatsApp (através de redirecionamento, sem acesso ao conteúdo das mensagens).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span>Realizar backups locais ou em nuvem (quando autorizado por você).</span>
                  </li>
                </ul>
              </section>

              {/* 4 */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">4. Permissões de Acesso (Android)</h2>
                <p className="text-foreground/85 mb-4">
                  Para funcionar, o aplicativo pode solicitar as seguintes permissões:
                </p>
                <ul className="space-y-3 pl-1">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span><strong>Contatos (READ_CONTACTS):</strong> Opcional. Usado apenas para facilitar a importação de clientes da sua agenda telefônica para o aplicativo.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span><strong>Armazenamento:</strong> Para salvar relatórios em PDF ou backups do banco de dados no seu dispositivo.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span><strong>Internet:</strong> Para verificar atualizações, processar assinaturas (se houver) e enviar dados anônimos de falhas (crashlytics).</span>
                  </li>
                </ul>
              </section>

              {/* 5 */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">5. Compartilhamento de Dados</h2>
                <p className="text-foreground/85 mb-4">
                  O <strong>Decola Beauty</strong> não vende, aluga ou compartilha seus dados pessoais ou de seus clientes com terceiros para fins publicitários.
                </p>
                <p className="text-foreground/85">
                  Os dados inseridos permanecem armazenados localmente no seu dispositivo, a menos que você utilize recursos de backup em nuvem de terceiros (como Google Drive).
                </p>
              </section>

              {/* 6 */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">6. Segurança</h2>
                <p className="text-foreground/85">
                  Implementamos medidas de segurança técnicas para proteger seus dados contra acesso não autorizado. No entanto, lembre-se que nenhuma transmissão pela internet ou armazenamento eletrônico é 100% seguro.
                </p>
              </section>

              {/* 7 */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">7. Seus Direitos e Exclusão de Dados</h2>
                <p className="text-foreground/85 mb-4">
                  Você tem total controle sobre os dados inseridos. A qualquer momento, você pode:
                </p>
                <ul className="space-y-3 pl-1">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span>Editar ou excluir clientes e agendamentos diretamente no app.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <span>Solicitar a exclusão completa da sua conta e dados associados entrando em contato conosco.</span>
                  </li>
                </ul>
              </section>

              {/* 8 */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-3">8. Contato</h2>
                <p className="text-foreground/85">
                  Se tiver dúvidas sobre esta política, entre em contato através do e-mail:{" "}
                  <strong className="text-primary">gabrielcamilom15@gmail.com</strong>
                </p>
              </section>
            </div>

            {/* Back button */}
            <div className="mt-12 pt-8 border-t border-border">
              <Button asChild variant="outline" className="rounded-2xl">
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para o Início
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
