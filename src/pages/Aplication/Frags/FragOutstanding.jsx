import { useMemo, useState, useEffect } from "react";
import { api, appointmentsApi } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import AppointmentAdapter from "../Adapters/AppointmentAdapter";
import CardLoading from "@/components/CardLoading";
import AppointmentDialog from "@/components/AppointmentDialog";
import { Search } from "lucide-react";

function normalizeText(value) {
    return String(value ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function appointmentMatchesSearch(appointment, normalizedSearch) {
    if (!normalizedSearch) return true;

    const normalizedCustomerName = normalizeText(appointment?.customer?.name ?? "");

    return normalizedCustomerName.includes(normalizedSearch);
}

export default function FragOutstanding() {
    const [search, setSearch] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getIdToken } = useAuth();
    const [Dialog, setDialog] = useState(
        {
            appointment: null,
            open: false,
        }
    );

    useEffect(() => {
        async function load() {
            try {
                const token = await getIdToken();
                api.setToken(token);
                const data = await appointmentsApi.list(); 
                setAppointments(data.filter((appointment) => appointment.status === "no_pay"));
            } catch (err) {
                console.log("Erro:", err);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    const normalizedSearch = useMemo(() => normalizeText(search), [search]);

    const filteredAppointments = useMemo(() => {
        return appointments.filter((appointment) =>
            appointmentMatchesSearch(appointment, normalizedSearch)
        );
    }, [appointments, normalizedSearch]);


    return (
        <section className="flex h-full min-h-0 w-full flex-col text-foreground">
            <div className="mx-auto flex w-full max-w-6xl flex-1 min-h-0 flex-col px-4 py-4 sm:px-6 lg:px-8">
                {Dialog.open && (
                    <AppointmentDialog
                        appointment={Dialog.appointment}
                        onClose={() => setDialog({ ...Dialog, open: false })}
                        onReminder={() => console.log("Lembrete")}
                        onEdit={() => console.log("Editar")}
                        onDelete={() => console.log("Deletar")}
                        onCustomerNotes={() => console.log("Notas cliente")}
                        onCustomerInfo={() => console.log("Info cliente")}
                        onOpenImages={() => console.log("Abrir imagens")}
                        onOpenPayment={() => console.log("Abrir pagamento")}
                        onOpenNotes={() => console.log("Abrir notas")}
                        onOpenStatus={() => console.log("Abrir status")}
                    />
                )}

                <div className="mb-4 rounded-3xl border border-border bg-card p-3 shadow-card sm:p-4">
                    <div className="flex items-center gap-3 rounded-2xl border border-input bg-background px-4 py-3 focus-within:ring-2 focus-within:ring-ring/30">
                        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar clientes"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                        />
                    </div>
                </div>

                <div className="mb-4 flex min-h-[35px] items-center justify-between rounded-xl bg-primary px-4 text-primary-foreground">
                    <span className="text-sm font-bold">Cobranças:</span>
                    <span className="text-sm font-bold">{filteredAppointments.length}/{appointments.length}</span>
                </div>

                <div className="min-h-0">
                    {
                        loading ? (
                            <CardLoading />
                        ) : (
                            <AppointmentAdapter
                                appointments={filteredAppointments}
                                onItemClick={(appointment) => {
                                    setDialog({ appointment, open: true });
                                    console.log(appointment);
                                }}
                                emptyMessage="Nenhuma cobrança encontrada."
                            />
                        )
                    }
                </div>
            </div>
        </section >
    );
}