import CardLoading from "@/components/CardLoading";
import { Users, Search, Phone, Mail, ChevronRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { api, customersApi } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";

function normalizeText(value) {
    return String(value ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function customerMatchesSearch(customer, normalizedSearch) {
    if (!normalizedSearch) return true;

    const normalizedCustomerName = normalizeText(customer?.name ?? "");
    const normalizedCustomerPhone = normalizeText(customer?.phone ?? "");

    return (
        normalizedCustomerName.includes(normalizedSearch) ||
        normalizedCustomerPhone.includes(normalizedSearch)
    );
}

export default function FragCustomer() {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const { getIdToken } = useAuth();

    useEffect(() => {
        async function load() {
            try {
                const token = await getIdToken();
                api.setToken(token);
                const data = await customersApi.list();
                setCustomers(data);
            } catch (err) {
                console.log("Erro:", err);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    const normalizedSearch = useMemo(() => normalizeText(search), [search]);

    const filteredCustomers = useMemo(() => {
        return customers.filter((customer) =>
            customerMatchesSearch(customer, normalizedSearch)
        );
    }, [customers, normalizedSearch]);

    return (
        <section className="flex h-full min-h-0 w-full flex-col text-foreground">
            <div className="mx-auto flex w-full max-w-6xl flex-1 min-h-0 flex-col px-4 py-4 sm:px-6 lg:px-8">
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

                <div className="min-h-0">
                    {loading ? (
                        <CardLoading />
                    ) : (
                        filteredCustomers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                    <Users className="h-8 w-8" />
                                </div>
                                <h2 className="text-base font-bold sm:text-lg">
                                    Nenhum cliente encontrado
                                </h2>
                            </div>
                        ) : (
                            <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card">
                                <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-border scrollbar-hide">
                                    {filteredCustomers.map((customer) => (
                                        <button
                                            key={customer.id}
                                            type="button"
                                            className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-muted/45 sm:px-5"
                                        >
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-bold text-primary">
                                                {(customer.name || "?").trim().charAt(0).toUpperCase()}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="truncate text-sm font-bold text-foreground sm:text-[15px]">
                                                    {customer.name || "Sem nome"}
                                                </div>

                                                <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                                                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
                                                        <Phone className="h-3.5 w-3.5" />
                                                        {customer.phone || "Sem telefone"}
                                                    </span>

                                                    {customer.email ? (
                                                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
                                                            <Mail className="h-3.5 w-3.5" />
                                                            <span className="truncate">{customer.email}</span>
                                                        </span>
                                                    ) : null}
                                                </div>
                                            </div>

                                            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                        )
                    )}

                </div>

            </div>
        </section>
    );
}