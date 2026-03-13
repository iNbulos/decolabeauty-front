import { useEffect, useState, useMemo } from "react";
import { Users, Search } from "lucide-react";
import { api, usersApi } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import CardLoading from "@/components/CardLoading";
import EntitlementCard from "@/components/application/EntitlementCard";

function UserAccordionCard({ user }) {
    const [expanded, setExpanded] = useState(false);

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

    function formatPhone(phoneNumber) {
        return phoneNumber || "Não informado";
    }

    return (
        <div className="w-full rounded-2xl transition hover:shadow-md">
            <button
                type="button"
                onClick={() => setExpanded((current) => !current)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
                <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-zinc-900">
                        {user.displayName || "Sem nome"}
                    </h3>
                    <p className="truncate text-sm text-zinc-500">
                        {user.email || "Sem e-mail"}
                    </p>
                </div>

                <div
                    className={`shrink-0 transition-transform duration-200 ${expanded ? "rotate-90" : "rotate-0"
                        }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-zinc-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>
            </button>
            <div
                className={`grid transition-all duration-300 ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="border-t border-zinc-100 px-5 py-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                            <InfoItem label="UID" value={user.uid} />
                            <InfoItem label="Telefone" value={formatPhone(user.phoneNumber)} />
                            <InfoItem
                                label="Desativado"
                                value={user.disabled ? "Sim" : "Não"}
                            />
                            <InfoItem
                                label="Criado em"
                                value={formatDate(user.createdAt)}
                            />
                            <InfoItem
                                label="Último login"
                                value={formatDate(user.lastSignInAt)}
                            />
                        </div>
                    </div>
                    <EntitlementCard entitlement={user.entitlements?.[0]} />
                </div>
            </div>


        </div>
    );
}


function InfoItem({ label, value }) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        const text = value == null ? "" : String(value);

        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                const el = document.createElement("textarea");
                el.value = text;
                el.setAttribute("readonly", "");
                el.style.position = "absolute";
                el.style.left = "-9999px";
                document.body.appendChild(el);
                el.select();
                document.execCommand("copy");
                document.body.removeChild(el);
            }

            setCopied(true);
            window.clearTimeout(handleCopy._t);
            handleCopy._t = window.setTimeout(() => setCopied(false), 1200);
        } catch (e) {
            console.error("Falha ao copiar:", e);
        }
    }

    return (
        <div className="rounded-xl bg-zinc-50 px-3 py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                {label}
            </p>

            <div className="mt-1 flex items-start gap-2">
                <p className="break-words text-sm text-zinc-900 flex-1">{value}</p>

                <button
                    type="button"
                    onClick={handleCopy}
                    className={[
                        "shrink-0 rounded-md p-1",
                        "text-zinc-500 hover:text-zinc-900",
                        "hover:bg-zinc-100 active:scale-[0.98]",
                        "focus:outline-none focus:ring-2 focus:ring-zinc-300",
                        copied ? "text-emerald-600" : ""
                    ].join(" ")}
                    aria-label={`Copiar ${label}`}
                    title={copied ? "Copiado!" : "Copiar"}
                >
                    {/* Ícone de copiar (Heroicons-like) */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                    >
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

function normalizeText(value) {
    return String(value ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function userMatchesSearch(user, normalizedSearch) {
    if (!normalizedSearch) return true;

    const normalizedUserName = normalizeText(user?.displayName ?? "");
    const normalizedUserEmail = normalizeText(user?.email ?? "");

    return (
        normalizedUserName.includes(normalizedSearch) ||
        normalizedUserEmail.includes(normalizedSearch)
    );
}

export default function UsersPage() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const { getIdToken } = useAuth();

    useEffect(() => {
        async function load() {
            try {
                const token = await getIdToken();
                api.setToken(token);
                const data = await usersApi.list();
                setUsers(data.users);
            } catch (err) {
                console.log("Erro:", err);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);


    const normalizedSearch = useMemo(() => normalizeText(search), [search]);

    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            userMatchesSearch(user, normalizedSearch)
        );
    }, [users, normalizedSearch]);

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
                        filteredUsers.length === 0 ? (
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
                                    {filteredUsers.map((user) => (
                                        <UserAccordionCard key={user.uid} user={user} />
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