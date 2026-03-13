import { Clock3 } from "lucide-react";

function parseDate(value) {
    if (!value) return null;

    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : value;
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDateBR(value) {
    const date = parseDate(value);
    if (!date) return "--/--/----";

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date);
}

function formatTimeBR(value) {
    const date = parseDate(value);
    if (!date) return "--:--";

    return new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

function formatMoneyBR(value) {
    const numericValue = Number(value ?? 0);

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(Number.isFinite(numericValue) ? numericValue : 0);
}

function getStatusValue(status) {
    if (!status) return "";

    if (typeof status === "string") {
        return status.toLowerCase().trim();
    }

    return String(
        status.dbValue ??
        status.db_value ??
        status.value ??
        status.code ??
        status.name ??
        status.label ??
        ""
    )
        .toLowerCase()
        .trim();
}

function getStatusLabel(status) {
    if (!status) return "Sem status";

    if (typeof status === "string") {
        const map = {
            scheduled: "Agendado",
            confirmed: "Confirmado",
            done: "Concluído",
            canceled: "Cancelado",
            no_show: "Não compareceu",
            no_pay: "Não pago",
        };

        return map[status.toLowerCase()] ?? status;
    }

    return String(
        status.label ??
        status.name ??
        status.value ??
        status.dbValue ??
        "Sem status"
    );
}

function getStatusClasses(status) {
    const value = getStatusValue(status);

    switch (value) {
        case "confirmed":
            return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
        case "done":
            return "bg-blue-500/10 text-blue-700 dark:text-blue-300";
        case "canceled":
            return "bg-rose-500/10 text-rose-700 dark:text-rose-300";
        case "no_show":
            return "bg-orange-500/10 text-orange-700 dark:text-orange-300";
        case "no_pay":
            return "bg-amber-500/15 text-amber-700 dark:text-amber-300";
        default:
            return "bg-muted text-muted-foreground";
    }
}

function getStartAt(appointment) {
    return appointment?.startAt ?? appointment?.start_at ?? null;
}

function getEndAt(appointment) {
    return appointment?.endAt ?? appointment?.end_at ?? null;
}

function getCustomerName(appointment) {
    return appointment?.customer?.name ?? "Cliente";
}

function getServiceText(appointment) {
    const services = Array.isArray(appointment?.services) ? appointment.services : [];

    if (!services.length) return "Sem serviço";

    const names = services.map((service) => service?.name).filter(Boolean);

    if (!names.length) return "Sem serviço";
    if (names.length === 1) return names[0];

    return `${names[0]} +${names.length - 1}`;
}

function getAppointmentValue(appointment) {
    const directValue =
        appointment?.value ??
        appointment?.finalValue ??
        appointment?.final_value ??
        appointment?.totalValue ??
        appointment?.total_value;

    if (directValue !== undefined && directValue !== null && directValue !== "") {
        return Number(directValue);
    }

    const services = Array.isArray(appointment?.services) ? appointment.services : [];

    return services.reduce((total, service) => {
        const price = Number(service?.price ?? 0);
        return total + (Number.isFinite(price) ? price : 0);
    }, 0);
}

function AppointmentItem({ appointment, onItemClick }) {
    const startAt = getStartAt(appointment);
    const endAt = getEndAt(appointment);
    const customer = getCustomerName(appointment);
    const service = getServiceText(appointment);
    const statusLabel = getStatusLabel(appointment?.status);
    const value = getAppointmentValue(appointment);

    return (
        <button
            type="button"
            onClick={() => onItemClick?.(appointment)}
            className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-muted/45 sm:px-5"
        >
            <div className="min-w-0 flex-1">
                <div className="flex  flex-row  items-center  justify-between">
                    <p className="truncate text-[16.5px] font-bold text-foreground">
                        {customer}
                    </p>

                    <p className="text-sm text-muted-foreground sm:text-right">
                        {formatDateBR(startAt)}
                    </p>
                </div>

                {/* service + state */}
                <div className="mt-2 flex flex-row items-center justify-between">
                    <p className="truncate text-sm text-foreground">
                        {service}
                    </p>

                    <span
                        className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                            appointment?.status
                        )}`}
                    >
                        {statusLabel}
                    </span>
                </div>

                {/* times + value */}
                <div className="mt-2 flex flex-row items-center justify-between">
                    <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock3 className="h-4 w-4" />
                        {formatTimeBR(startAt)} ~ {formatTimeBR(endAt)}
                    </p>

                    <p className="text-sm font-bold text-primary">
                        {formatMoneyBR(value)}
                    </p>
                </div>
            </div>
        </button>
    );
}

export default function AppointmentAdapter({
    appointments = [],
    onItemClick,
    emptyMessage = "Nenhum agendamento encontrado.",
}) {
    if (!appointments.length) {
        return (
            <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center">
                <p className="text-sm text-muted-foreground">{emptyMessage}</p>
            </div>
        );
    }
    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-border scrollbar-hide">
                {appointments.map((appointment, index) => (
                    <AppointmentItem
                        key={appointment?.id ?? `appointment-${index}`}
                        appointment={appointment}
                        onItemClick={onItemClick}
                    />
                ))}
            </div>
        </div>
    );
}