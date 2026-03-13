import { motion } from "framer-motion";
import {
    AlertTriangle,
    ArrowRight,
    LockKeyhole,
    RefreshCcw,
    Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LogoutDialog from "./LogoutDialog";

export default function SubscriptionInactive({
    message,
    onOpenPlans,
    onRefreshStatus,
}) {

    const [dialog, setDialog] = useState(false);

    return (
        <section className="relative flex min-h-[calc(100vh-7rem)] w-full items-center justify-center overflow-hidden px-3 py-4 sm:px-4 lg:px-6">
            {
                dialog && (
                    <LogoutDialog onClose={() => setDialog(false)} />
                )
            }

            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-secondary/10 blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative w-full max-w-3xl overflow-hidden rounded-[30px] border border-border bg-card shadow-glow-lg"
            >
                <div className="bg-hero-gradient px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-destructive/10 text-destructive shadow-card">
                                <AlertTriangle className="h-7 w-7" />
                            </div>

                            <div>
                                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Acesso restrito
                                </div>

                                <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                                    Sua assinatura está inativa
                                </h1>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                                    {message || "Seu acesso aos recursos do sistema foi temporariamente bloqueado até a regularização do plano."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
                    <div className="rounded-3xl border border-border bg-background/70 p-4 shadow-card sm:p-5">
                        <h2 className="text-base font-bold text-foreground sm:text-lg">
                            O acesso está bloqueado no momento
                        </h2>

                        <div className="mt-4 rounded-2xl border border-border bg-card p-4">
                            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <LockKeyhole className="h-5 w-5" />
                            </div>

                            <p className="text-sm font-semibold text-foreground">
                                Regularize sua assinatura para continuar usando o painel
                            </p>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Assim que a assinatura for reativada, o acesso às funcionalidades do sistema poderá ser liberado novamente.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-border bg-card p-4 shadow-card sm:p-5">
                        <h2 className="text-base font-bold text-foreground sm:text-lg">
                            O que você pode fazer
                        </h2>

                        <div className="mt-5 flex flex-col gap-3">
                            <Button
                                type="button"
                                onClick={onOpenPlans}
                                className="h-11 rounded-2xl text-sm font-semibold shadow-glow"
                            >
                                Regularizar assinatura
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={onRefreshStatus}
                                className="h-11 rounded-2xl text-sm font-semibold"
                            >
                                <RefreshCcw className="mr-2 h-4 w-4" />
                                Atualizar status
                            </Button>

                            <Button
                                type="button"
                                variant="ghost"
                                onClick={()=> setDialog(true)}
                                className="h-11 rounded-2xl text-sm font-semibold text-muted-foreground hover:text-foreground"
                            >
                                Sair da conta
                            </Button>
                        </div>

                        <div className="mt-5 rounded-2xl border border-primary/10 bg-primary/5 p-3">
                            <p className="text-xs leading-5 text-muted-foreground">
                                Se o pagamento já foi feito, use <span className="font-semibold text-foreground">Atualizar status</span> para tentar liberar o acesso novamente.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}