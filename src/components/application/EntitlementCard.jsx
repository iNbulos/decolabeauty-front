import { useState, useRef } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import { Calendar } from "lucide-react";
import { api, usersApi } from "../../api";
import { useAuth } from "../../contexts/AuthContext";
export default function EntitlementCard({ entitlement }) {

    if (!entitlement) {
        return null;
    }
    const { getIdToken } = useAuth();
    const dateInputRef = useRef(null);
    const [isLoading, setLoading] = useState(false);
    const [subscription, setSubscription] = useState({
        created_at: entitlement.created_at,
        current_period_end_at: entitlement.current_period_end_at,
        current_period_start_at: entitlement.current_period_start_at,
        plan: entitlement.plan,
        source: entitlement.source,
        status: entitlement.status,
        trial_ends_at: entitlement.trial_ends_at,
        trial_started_at: entitlement.trial_started_at,
        updated_at: entitlement.updated_at,
        user_id: entitlement.user_id,
    });

    function formatDate(dateValue) {
        if (!dateValue) return "Não informado";

        const parsedDate = new Date(dateValue);
        if (Number.isNaN(parsedDate.getTime())) return dateValue;

        return parsedDate.toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
            timeZone: "UTC",
        });
    }

    async function handleSave() {
        setLoading(true);
        try {
            const token = await getIdToken();
            api.setToken(token);
            const data = await usersApi.patch(subscription);
            if (data.ok) {
                toast.success(data.message || "Assinatura atualizada com sucesso!");
            } else {
                toast.error("Erro ao atualizar assinatura: " + (data.message || "Resposta inesperada"));
            }
        } catch (err) {
            toast.error("Erro: " + err.message || err);
        } finally {
            setLoading(false);
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-4">
                <Card className="w-full max-w-sm shadow-lg rounded-2xl">
                    <CardContent className="flex flex-col items-center justify-center gap-3 p-6">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
                        <p className="text-sm text-gray-600">Carregando...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }


    return (
        <section className="rounded-2xl bg-gradient-to-br from-white via-white to-violet-50/30 px-8 pb-8 ">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-violet-400">
                        Assinatura
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                        Informações atuais da assinatura do usuário
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={() => setSubscription((s) => ({ ...s, status: s.status === "active" ? "inactive" : "active" }))}
                        className={[
                            "relative inline-flex w-14 h-7 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2",
                            subscription.status === "active" ? "bg-emerald-500" : "bg-zinc-300",
                        ].join(" ")}
                        aria-pressed={subscription.status === "active"}
                        aria-label={subscription.status === "active" ? "Desativar assinatura" : "Ativar assinatura"}
                    >
                        <span
                            className={[
                                "inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300",
                                subscription.status === "active" ? "translate-x-8" : "translate-x-1",
                            ].join(" ")}
                        />
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
                    >
                        Salvar alterações
                    </button>
                </div>

            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="rounded-2xl bg-white/90 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                        Plano
                    </p>
                    <p className="mt-2 break-all text-sm font-medium text-zinc-800">
                        {subscription?.plan || "-"}
                    </p>
                </div>
                <InfoBox titulo="Origem" valor={subscription?.source} />
                <InfoBox
                    titulo="Status textual"
                    valor={subscription.status === "active" ? "actived" : "inactive"}
                />
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white/80">
                <LinhaInfo label="Criado em" value={formatDate(subscription?.created_at)} />
                <LinhaInfo label="Início do teste" value={formatDate(subscription?.trial_started_at)} />
                <div className="flex items-center justify-between gap-4 border-b border-zinc-200">
                    <div className="grid grid-cols-1 gap-1 px-4 py-3 md:grid-cols-[220px_1fr]">
                        <span className="text-sm font-medium text-zinc-500">Fim do teste</span>
                        <span className="break-all text-sm text-zinc-800">
                            {formatDate(subscription?.trial_ends_at) || "-"}
                        </span>
                    </div>
                    <>
                        <input
                            ref={dateInputRef}
                            type="date"
                            className="relative opacity-0 pointer-events-none "
                            onChange={(e) => {
                                const novaData = `${e.target.value} 00:00:00+00`;

                                setSubscription((s) => ({ ...s, trial_ends_at: novaData }));
                                toast.success(`Enviando: ${formatDate(novaData)}`);
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => dateInputRef.current?.showPicker?.() || dateInputRef.current?.click()}
                            className="rounded-lg  mr-2 px-4 py-2 hover:bg-gray-200"
                        >
                            <Calendar size={16} />
                        </button>

                    </>

                </div>
                <LinhaInfo
                    label="Início do período atual"
                    value={formatDate(subscription?.current_period_start_at)}
                />
                <LinhaInfo
                    label="Fim do período atual"
                    value={formatDate(subscription?.current_period_end_at)}
                    last
                />
            </div>
        </section>
    );
}

function InfoBox({ titulo, valor }) {
    return (
        <div className="rounded-2xl border border-zinc-200 bg-white/90 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                {titulo}
            </p>
            <p className="mt-2 break-all text-sm font-medium text-zinc-800">
                {valor || "-"}
            </p>
        </div>
    );
}

function LinhaInfo({ label, value, last = false }) {
    return (
        <div
            className={[
                "grid grid-cols-1 gap-1 px-4 py-3 md:grid-cols-[220px_1fr]",
                !last ? "border-b border-zinc-200" : "",
            ].join(" ")}
        >
            <span className="text-sm font-medium text-zinc-500">{label}</span>
            <span className="break-all text-sm text-zinc-800">
                {value || "-"}
            </span>
        </div>
    );
}