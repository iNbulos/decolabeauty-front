import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  LogOut,
  BadgeCheck,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LogoutDialog from "@/components/application/LogoutDialog";

const DEFAULT_AVATAR = "https://www.gravatar.com/avatar/?d=mp&f=y";

export default function FragUser() {
  const { user, signOut, loading, role } = useAuth();
  const [, setLocation] = useLocation();
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setLocation("/login");
    }
  }, [loading, user, setLocation]);

  if (loading) {
    return (
      <section className="flex h-full min-h-0 w-full flex-col text-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-1 min-h-0 flex-col px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center justify-center rounded-3xl border border-border bg-card p-6 shadow-card">
            <p className="text-sm text-muted-foreground">
              Carregando sua conta...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!user) return null;

  const displayName =
    user.displayName || (user.email ? user.email.split("@")[0] : "Usuário");

  const providers =
    user.providerData?.length > 0
      ? user.providerData.map((provider) => provider.providerId).join(", ")
      : null;

  async function handleSignOut() {
    try {
      await signOut();
    } finally {
      setLocation("/");
    }
  }

  return (
    <section className="flex h-full min-h-0 w-full flex-col text-foreground">
      {dialog && (
        <LogoutDialog
          onClose={() => setDialog(false)}
          onConfirm={handleSignOut}
          userName={displayName}
        />
      )}

      <div className="mx-auto flex w-full max-w-6xl flex-1 min-h-0 flex-col px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <div className="border-b border-border bg-hero-gradient px-4 py-5 sm:px-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
                <div className="h-24 w-24 overflow-hidden rounded-3xl border border-border bg-muted shrink-0">
                  <img
                    src={user.photoURL || DEFAULT_AVATAR}
                    alt="Foto de perfil"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_AVATAR;
                    }}
                  />
                </div>

                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <h1 className="truncate text-lg font-extrabold text-foreground sm:text-2xl">
                    {displayName}
                  </h1>

                  {user.email ? (
                    <p className="mt-1 break-all text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  ) : null}

                  <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold sm:text-xs ${user.emailVerified
                        ? "border-emerald-200 bg-emerald-500/10 text-emerald-700 dark:border-emerald-900/40 dark:text-emerald-400"
                        : "border-amber-200 bg-amber-500/10 text-amber-700 dark:border-amber-900/40 dark:text-amber-400"
                        }`}
                    >
                      {user.emailVerified ? (
                        <ShieldCheck className="h-3.5 w-3.5" />
                      ) : (
                        <ShieldAlert className="h-3.5 w-3.5" />
                      )}
                      {user.emailVerified
                        ? "Email verificado"
                        : "Email não verificado"}
                    </span>

                    {role ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary sm:text-xs">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        {role}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="divide-y divide-border">
              <div className="grid gap-3 p-4 sm:p-6">
                <div className="flex flex-col gap-2 rounded-2xl border border-border bg-background px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <KeyRound className="h-4 w-4" />
                    UID
                  </div>
                  <span className="break-all font-mono text-xs text-foreground sm:max-w-[60%] sm:text-right">
                    {user.uid}
                  </span>
                </div>

                {user.phoneNumber ? (
                  <div className="flex flex-col gap-2 rounded-2xl border border-border bg-background px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      Telefone
                    </div>
                    <span className="text-sm text-foreground">
                      {user.phoneNumber}
                    </span>
                  </div>
                ) : null}

                {user.email ? (
                  <div className="flex flex-col gap-2 rounded-2xl border border-border bg-background px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      E-mail
                    </div>
                    <span className="break-all text-sm text-foreground sm:max-w-[60%] sm:text-right">
                      {user.email}
                    </span>
                  </div>
                ) : null}

                {providers ? (
                  <div className="flex flex-col gap-2 rounded-2xl border border-border bg-background px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <User className="h-4 w-4" />
                      Login via
                    </div>
                    <span className="text-sm text-foreground sm:max-w-[60%] sm:text-right">
                      {providers}
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-3 p-4 sm:flex-row sm:justify-between sm:p-6">

                <button
                  type="button"
                  onClick={()=> setDialog(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  <LogOut className="h-4 w-4" />
                  Sair da conta
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Você está conectado.
          </p>
        </div>
      </div>
    </section>
  );
}