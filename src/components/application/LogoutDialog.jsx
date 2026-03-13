import { LogOut, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";

export default function LogoutDialog({ onClose }) {

    const { user, signOut } = useAuth();
    const [, setLocation] = useLocation();
    async function handleSignOut() {
    try {
        await signOut();
    } finally {
        setLocation("/");
    }
}
    return (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/45 p-3 sm:p-4">
            <div
                className="absolute inset-0"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-border bg-card shadow-glow-lg">
                <div className="max-h-[90vh] overflow-y-auto">
                    {/* topo decorativo */}
                    <div className="bg-hero-gradient px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary shadow-card">
                                    <LogOut className="h-6 w-6" />
                                </div>

                                <div>
                                    <h2 className="text-left text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
                                        Confirmar saída
                                    </h2>
                                    <p className="mt-1 text-left text-sm text-muted-foreground">
                                        Encerrar a sessão atual
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition hover:bg-accent/10 hover:text-foreground"
                                aria-label="Fechar"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* conteúdo */}
                    <div className="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                        <div className="rounded-2xl border border-border bg-muted/40 p-4">
                            <p className="text-sm leading-6 text-foreground sm:text-[15px]">
                                {user.displayName ? (
                                    <>
                                        <span className="font-bold text-primary">{user.displayName}</span>, você deseja realmente sair da sua conta?
                                    </>
                                ) : (
                                    <>Você deseja realmente sair da sua conta?</>
                                )}
                            </p>

                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Para continuar usando as áreas privadas, será necessário fazer login novamente.
                            </p>
                        </div>

                        {/* ações */}
                        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition hover:bg-muted"
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                onClick={handleSignOut}
                                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                            >
                                <LogOut className="h-4 w-4" />
                                Sair da conta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}