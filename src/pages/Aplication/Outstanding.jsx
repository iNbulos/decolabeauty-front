import { useMemo, useState, useEffect } from "react";
import { api, appointmentsApi } from "../../api";
import { useAuth } from "../../contexts/AuthContext";
import AppointmentAdapter from "./Adapters/AppointmentAdapter";
import CardLoading from "@/components/CardLoading";

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

export default function Outstanding() {
    const [search, setSearch] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getIdToken } = useAuth();

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
        <section className="flex h-full min-h-0 w-full flex-col bg-background text-foreground">
            <div className="px-3 pt-3 sm:px-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar clientes"
                    className="h-12 w-full rounded-2xl border border-input bg-card px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
            </div>

            <div className="px-3 py-3 sm:px-4">
                <div className="flex min-h-[35px] items-center justify-between rounded-xl bg-primary px-4 text-primary-foreground">
                    <span className="text-sm font-bold">Cobranças:</span>
                    <span className="text-sm font-bold">{filteredAppointments.length}/{appointments.length}</span>
                </div>
            </div>

            {
                loading ? (
                    <CardLoading />
                ) : (
                    <div className="flex-1 min-h-0 overflow-y-auto px-3 pb-3 sm:px-4 sm:pb-4">
                        <AppointmentAdapter
                            appointments={filteredAppointments}
                            onItemClick={(appointment) => console.log(appointment)}
                            emptyMessage="Nenhuma cobrança encontrada."
                        />
                    </div>
                )
            }


        </section>
    );
}