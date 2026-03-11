import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "wouter";
import Outstanding from "./Outstanding";

export default function Main() {
    const [activeItem, setActiveItem] = useState("agenda");
    const [activePage, setActivePage] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();
    const [, setLocation] = useLocation();

    function handleNavigate(itemId) {
        setActiveItem(itemId);

        if (itemId === "logout") {
            console.log("Executar logout");
            setSidebarOpen(false);
            return;
        }

        if (itemId === "home") {
            setLocation("/");
            setSidebarOpen(false);
            return;
        }

        if (itemId === "outstanding") {
            setActivePage(<Outstanding />);
            setSidebarOpen(false);
            return;
        }

        setSidebarOpen(false);
        setActivePage(null)
    }

    return (
        <div className="h-screen overflow-hidden bg-background lg:flex">
            <Sidebar
                activeItem={activeItem}
                onNavigate={handleNavigate}
                userName={user?.displayName}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex min-h-0 flex-1 flex-col lg:ml-0">
                <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur lg:hidden">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card text-foreground shadow-sm"
                            aria-label="Abrir menu"
                        >
                            <Menu className="h-5 w-5" />
                        </button>

                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white shadow-glow overflow-hidden">
                                <img
                                    src="https://decolabeauty.com/media/logo-decolabeauty.png"
                                    alt="Logo Decola Beauty"
                                    className="h-7 w-7 object-contain"
                                />
                            </div>

                            <div className="min-w-0">
                                <h1 className="truncate text-sm font-extrabold text-foreground">
                                    Decola Beauty
                                </h1>
                                <p className="truncate text-xs text-muted-foreground">
                                    {user?.displayName || "Usuário"}
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex flex-1 min-h-0 p-4 sm:p-5 md:p-6">
                    <div className="flex min-h-0 flex-1 rounded-2xl border border-border bg-card p-4 shadow-card sm:rounded-3xl sm:p-6">
                        {
                            activePage && (
                                <div className="flex min-h-0 flex-1">
                                    {activePage}
                                </div>
                            )
                        }
                    </div>
                </main>
            </div>
        </div>
    );
}