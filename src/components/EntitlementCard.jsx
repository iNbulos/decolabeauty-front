export default function EntitlementCard({
    subscription,
    onToggleStatus,
}) {
    const statusAtivo = subscription?.status === "active";

    if (!subscription) {
        return null;
    }

    function formatDate(dateValue) {
        if (!dateValue) return "Não informado";

        const parsedDate = new Date(dateValue);
        if (Number.isNaN(parsedDate.getTime())) return dateValue;

        return parsedDate.toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
        });
    }

    return (
        <section className="rounded-2xl  bg-gradient-to-br from-white via-white to-violet-50/30 px-8 pb-8 shadow-sm">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-violet-400">
                        Assinatura
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                        Informações atuais da assinatura do usuário
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onToggleStatus}
                    className={[
                        "inline-flex min-w-[120px] items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition",
                        statusAtivo
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-zinc-200 bg-zinc-100 text-zinc-600",
                    ].join(" ")}
                >
                    <span
                        className={[
                            "mr-2 h-2.5 w-2.5 rounded-full",
                            statusAtivo ? "bg-emerald-500" : "bg-zinc-400",
                        ].join(" ")}
                    />
                    {statusAtivo ? "Ativo" : "Inativo"}
                </button>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <InfoBox titulo="Plano" valor={subscription?.plan} />
                <InfoBox titulo="Origem" valor={subscription?.source} />
                <InfoBox
                    titulo="Status textual"
                    valor={subscription?.status}
                />
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white/80">
                <LinhaInfo label="Criado em" value={formatDate(subscription?.created_at)} />
                <LinhaInfo label="Início do teste" value={formatDate(subscription?.trial_started_at)} />
                <LinhaInfo label="Fim do teste" value={formatDate(subscription?.trial_ends_at)} />
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