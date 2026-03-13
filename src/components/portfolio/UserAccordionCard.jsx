import { useState } from "react";
import EntitlementCard from "../application/EntitlementCard";

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
    <div className="w-full rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
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

export default UserAccordionCard;