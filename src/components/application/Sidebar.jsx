import { useEffect, useMemo, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { sidebarSections } from "../../lib/sidebar";
import { useAuth } from "../../contexts/AuthContext";

function SidebarItem({
  item,
  isActive,
  onNavigate,
  onItemClick,
}) {
  const Icon = item.icon;

  function handleClick() {
    onNavigate(item.id);
    onItemClick?.();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={[
        "flex w-full items-center gap-3 rounded-2xl px-3 sm:px-4 py-3 text-left transition-all duration-200",
        "border",
        isActive
          ? "bg-primary text-primary-foreground border-primary shadow-glow"
          : item.danger
            ? "bg-transparent text-rose-600 border-transparent hover:bg-rose-50 dark:hover:bg-rose-950/30"
            : "bg-transparent text-foreground border-transparent hover:bg-muted hover:border-border",
      ].join(" ")}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="min-w-0 truncate text-sm font-semibold">{item.label}</span>
    </button>
  );
}

export default function Sidebar({
  activeItem = "agenda",
  onNavigate = () => { },
  userName = "Usuário",
  isOpen = false,
  onClose = () => { },
}) {

  const { role } = useAuth();

  function isAdmin() {
    return role === "admin";
  }

  return (
    <>
      <div
        onClick={onClose}
        className={[
          "fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      <aside
        className={[
          "fixed left-0 top-0 z-50 flex h-dvh w-[88vw] max-w-[320px] flex-col",
          "border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:w-[290px] lg:max-w-none lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-sidebar-border px-4 sm:px-5 py-4 sm:py-5 lg:justify-start">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-glow overflow-hidden">
              <img
                src="https://decolabeauty.com/media/logo-decolabeauty.png"
                alt="Logo Decola Beauty"
                className="h-8 w-8 object-contain"
              />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-base font-extrabold text-foreground">
                Decola Beauty
              </h1>
              <p className="truncate text-sm text-muted-foreground">
                Olá, {userName || "Usuário"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground lg:hidden"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-.5 overflow-y-auto px-3 sm:px-4 py-4">
          {sidebarSections.map((section) => {
            if (!section.visible) {
              return null;
            }

            if (section.id === "entitlements" && !isAdmin()) {
              return null; // Esconde o item "Entitlements" para usuários não administradores
            }

            if (section.type === "group") {
              return (
                <span className="min-w-0 ms-1 truncate text-[11px] sm:text-xs text-gray-500 font-bold uppercase tracking-[0.16em]">
                  {section.label}
                </span>
              );
            }
            if (section.type === "item") {
              return (
                <SidebarItem
                  key={section.id}
                  item={section}
                  isActive={activeItem === section.id}
                  onNavigate={onNavigate}
                  onItemClick={onClose}
                />
              );
            }
          })}
        </div>

        <div className="border-t border-sidebar-border px-3 sm:px-4 py-4">
          <div className="rounded-2xl bg-muted/70 p-4">
            <p className="text-sm font-semibold text-foreground">
              Gestão com estilo
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Agenda, clientes, finanças e organização em um só lugar.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}