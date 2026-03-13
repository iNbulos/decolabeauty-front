import {
    MessageCircle,
    MessageSquareText,
    Pencil,
    Trash2,
    Clock3,
    ChevronRight,
    User,
    NotebookText,
    Info,
    BriefcaseBusiness,
    BadgePercent,
    Images,
    CreditCard,
    FileText,
    Tag,
    X,
} from "lucide-react";

export default function AppointmentDialog({
    appointment,
    onClose,
    onReminder,
    onEdit,
    onDelete,
    onCustomerNotes,
    onCustomerInfo,
    onOpenImages,
    onOpenPayment,
    onOpenNotes,
    onOpenStatus,
}) {
    const statusLabels = {
        scheduled: "Agendado",
        confirmed: "Confirmado",
        done: "Concluído",
        canceled: "Cancelado",
        no_show: "Não compareceu",
        no_pay: "Não pago",
    };

    const paymentLabels = {
        cash: "Dinheiro",
        pix_transfer: "PIX / Transferência",
        credit_card: "Cartão de Crédito",
        debit_card: "Cartão de Débito",
        check: "Cheque",
        complimentary: "Cortesia",
    };

    const startDate = appointment?.start_at
        ? new Date(appointment.start_at)
        : null;

    const endDate = appointment?.end_at
        ? new Date(appointment.end_at)
        : null;

    const services = appointment?.services || [];

    const serviceNames = services.map((service) => service.name).join(", ");

    const serviceValue = services.reduce((total, service) => {
        return total + Number(service?.price || 0);
    }, 0);

    const imageCount = appointment?.images?.length || 0;

    const hasDiscount =
        appointment?.discount_type || appointment?.discount_value || appointment?.discount_percent;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-3 sm:p-4">
            <div className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-border bg-card shadow-glow-lg">
                <div className="max-h-[90vh] overflow-y-auto">

                    <div className="p-4 sm:p-5">
                        <div className="mb-4 grid grid-cols-4 gap-2 sm:gap-3">
                            <a
                                href={"https://api.whatsapp.com/send?phone=" + appointment?.customer?.phone}
                                className="flex min-h-[60px] flex-col items-center justify-center rounded-2xl border border-[color:var(--color-whatsapp)]/20 bg-[color:var(--color-whatsapp)]/8 px-2 py-3 text-center transition hover:bg-[color:var(--color-whatsapp)]/14 sm:min-h-[84px] sm:px-3"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <MessageCircle className="mb-1.5 h-5 w-5 shrink-0 text-[color:var(--color-whatsapp)] sm:mb-2" />
                                <span className="text-[11px] font-semibold leading-tight text-[color:var(--color-whatsapp)] sm:text-sm">
                                    Whats
                                </span>
                            </a>

                            <button
                                type="button"
                                onClick={onReminder}
                                className="flex min-h-[60px] flex-col items-center justify-center rounded-2xl border border-[color:var(--color-whatsapp)]/20 bg-[color:var(--color-whatsapp)]/8 px-2 py-3 text-center transition hover:bg-[color:var(--color-whatsapp)]/14 sm:min-h-[84px] sm:px-3"
                            >
                                <MessageSquareText className="mb-1.5 h-5 w-5 shrink-0 text-[color:var(--color-whatsapp)] sm:mb-2" />
                                <span className="text-[11px] font-semibold leading-tight text-[color:var(--color-whatsapp)] sm:text-sm">
                                    Lembrete
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={onEdit}
                                className="flex min-h-[60px] flex-col items-center justify-center rounded-2xl border border-border bg-muted/40 px-2 py-3 text-center transition hover:bg-muted sm:min-h-[84px] sm:px-3"
                            >
                                <Pencil className="mb-1.5 h-5 w-5 shrink-0 text-foreground sm:mb-2" />
                                <span className="text-[11px] font-semibold leading-tight text-foreground sm:text-sm">
                                    Editar
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={onDelete}
                                className="flex min-h-[60px] flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 px-2 py-3 text-center transition hover:bg-destructive/15 sm:min-h-[84px] sm:px-3"
                            >
                                <Trash2 className="mb-1.5 h-5 w-5 shrink-0 text-destructive sm:mb-2" />
                                <span className="text-[11px] font-semibold leading-tight text-destructive sm:text-sm">
                                    Deletar
                                </span>
                            </button>
                        </div>

                        <div className="space-y-3">
                            <button
                                type="button"
                                className="flex w-full items-center gap-3 rounded-2xl border border-border bg-muted/30 px-3 py-3 text-left transition hover:bg-muted/50"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <Clock3 className="h-5 w-5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold text-foreground">
                                        {appointment?.duration || "0"} min
                                        {startDate && endDate
                                            ? ` • ${startDate.toLocaleTimeString("pt-BR", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })} às ${endDate.toLocaleTimeString("pt-BR", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}`
                                            : ""}
                                    </p>
                                    <p className="truncate text-sm text-muted-foreground">
                                        {startDate
                                            ? startDate.toLocaleDateString("pt-BR", {
                                                weekday: "long",
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            })
                                            : "Sem data"}
                                    </p>
                                </div>

                                <ChevronRight className="h-5 w-5 text-primary" />
                            </button>

                            <div className="flex w-full items-center gap-3 rounded-2xl border border-border bg-muted/30 px-3 py-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <User className="h-5 w-5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold text-foreground">
                                        {appointment?.customer?.name || "Cliente"}
                                    </p>
                                    <p className="truncate text-sm text-muted-foreground">
                                        {appointment?.customer?.phone || "Sem telefone"}
                                    </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={onCustomerNotes}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:bg-muted hover:text-foreground"
                                    >
                                        <NotebookText className="h-5 w-5" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={onCustomerInfo}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition hover:bg-muted hover:text-foreground"
                                    >
                                        <Info className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={onOpenImages}
                                className="flex w-full items-center gap-3 rounded-2xl border border-border bg-muted/30 px-3 py-3 text-left transition hover:bg-muted/50"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <BriefcaseBusiness className="h-5 w-5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold text-foreground">
                                        {serviceNames || "Sem serviços"}
                                    </p>
                                    <p className="truncate text-sm text-muted-foreground">
                                        R$ {serviceValue.toFixed(2).replace(".", ",")}
                                    </p>
                                </div>

                                <BadgePercent className="h-5 w-5 text-primary" />
                            </button>

                            <button
                                type="button"
                                onClick={onOpenImages}
                                className="flex w-full items-center gap-3 rounded-2xl border border-border bg-muted/30 px-3 py-3 text-left transition hover:bg-muted/50"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <Images className="h-5 w-5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold text-foreground">
                                        Fotos do agendamento
                                    </p>
                                    <p className="truncate text-sm text-muted-foreground">
                                        {imageCount} imagem{imageCount === 1 ? "" : "ens"}
                                    </p>
                                </div>

                                <ChevronRight className="h-5 w-5 text-primary" />
                            </button>

                            <button
                                type="button"
                                onClick={onOpenPayment}
                                className="flex w-full items-center gap-3 rounded-2xl border border-border bg-muted/30 px-3 py-3 text-left transition hover:bg-muted/50"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <CreditCard className="h-5 w-5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold text-foreground">
                                        Forma de pagamento
                                    </p>
                                    <p className="truncate text-sm text-muted-foreground">
                                        {paymentLabels[appointment?.payment_method] ||
                                            appointment?.payment_method ||
                                            "Não informado"}
                                    </p>
                                </div>

                                <ChevronRight className="h-5 w-5 text-primary" />
                            </button>

                            <button
                                type="button"
                                onClick={onOpenNotes}
                                className="flex w-full items-center gap-3 rounded-2xl border border-border bg-muted/30 px-3 py-3 text-left transition hover:bg-muted/50"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <FileText className="h-5 w-5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold text-foreground">
                                        Observações
                                    </p>
                                    <p className="truncate text-sm text-muted-foreground">
                                        {appointment?.notes || "Sem observações"}
                                    </p>
                                </div>

                                <ChevronRight className="h-5 w-5 text-primary" />
                            </button>

                            <button
                                type="button"
                                onClick={onOpenStatus}
                                className="flex w-full items-center gap-3 rounded-2xl border border-border bg-muted/30 px-3 py-3 text-left transition hover:bg-muted/50"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <Tag className="h-5 w-5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-bold text-foreground">
                                        Situação / status
                                    </p>
                                    <p className="truncate text-sm text-muted-foreground">
                                        {statusLabels[appointment?.status] || appointment?.status || "Sem status"}
                                    </p>
                                </div>

                                <ChevronRight className="h-5 w-5 text-primary" />
                            </button>

                            {hasDiscount ? (
                                <div className="rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3">
                                    <p className="text-sm font-bold text-foreground">Desconto aplicado</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {appointment?.discount_type === "percent" && appointment?.discount_percent
                                            ? `${appointment.discount_percent}%`
                                            : ""}
                                        {appointment?.discount_type === "value" && appointment?.discount_value
                                            ? `R$ ${Number(appointment.discount_value).toFixed(2).replace(".", ",")}`
                                            : ""}
                                    </p>
                                </div>
                            ) : null}
                        </div>

                        <div className="mt-5">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full rounded-2xl border border-primary/20 bg-card px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}