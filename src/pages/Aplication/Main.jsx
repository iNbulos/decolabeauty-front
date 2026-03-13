import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { sidebarTranslate } from "../../lib/sidebar";
import { api, entitlementsApi } from "../../api";
import Sidebar from "../../components/application/Sidebar";
import FragOutstanding from "./Frags/FragOutstanding";
import FragCustomer from "./Frags/FragCustomer";
import FragUser from "./Frags/FragUser";
import FragEntitlements from "./Frags/FragEntitlements";
import CardLoading from "@/components/CardLoading";
import SubscriptionInactive from "@/components/application/SubscriptionInactive";

export default function Main() {
    const [activeItem, setActiveItem] = useState("agenda");
    const [activePage, setActivePage] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [signature, setSignature] = useState({
        ok: false,
        message: "Verificando assinatura..."
    });
    
    const [loading, setLoading] = useState(true);

    const { getIdToken, user } = useAuth();

    useEffect(() => {
        async function load() {
            try {
                const token = await getIdToken();
                api.setToken(token);
                const data = await entitlementsApi.list();
                setSignature(data);
            } catch (err) {
                console.log("Erro:", err);
                setSignature({
                    ok: false,
                    message: "Erro ao verificar assinatura."
                });
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [getIdToken]);

    function handleNavigate(itemId) {
        setActiveItem(itemId);

        if (itemId === "outstanding") {
            setActivePage(<FragOutstanding />);
            setSidebarOpen(false);
            return;
        }

        if (itemId === "customers") {
            setActivePage(<FragCustomer />);
            setSidebarOpen(false);
            return;
        }

        if (itemId === "settings") {
            setActivePage(<FragUser />);
            setSidebarOpen(false);
            return;
        }

        if (itemId === "entitlements") {
            setActivePage(<FragEntitlements />);
            setSidebarOpen(false);
            return;
        }

        setSidebarOpen(false);
        setActivePage(null);
    }

    if (loading) {
        return <CardLoading />;
    }

    if (!signature.ok) {
        return <SubscriptionInactive message={signature.message} />;
    }

    return (
        <div className="flex min-h-dvh flex-col overflow-hidden bg-background lg:flex-row">
            <Sidebar
                activeItem={activeItem}
                onNavigate={handleNavigate}
                userName={user?.displayName}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex min-h-0 flex-1 flex-col lg:ml-0">
                <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur lg:hidden">
                    <div className="flex items-center px-4 py-3">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card text-foreground shadow-sm"
                            aria-label="Abrir menu"
                        >
                            <Menu className="h-5 w-5" />
                        </button>

                        <div className="flex min-w-0 mx-5 items-center gap-3">
                            <div className="min-w-0">
                                <h1 className="truncate text-lg font-extrabold text-foreground">
                                    {sidebarTranslate[activeItem]}
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex flex-1 min-h-0 max-h-screen p-4 sm:p-5 md:p-6">
                    <div className="flex min-h-0 flex-1 rounded-2xl border border-border bg-card p-4 shadow-card sm:rounded-3xl sm:p-6">
                        {activePage && (
                            <div className="flex min-h-0 flex-1">
                                {activePage}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}