import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
const DEFAULT_AVATAR =
  "https://www.gravatar.com/avatar/?d=mp&f=y"; // ícone padrão de pessoa

export default function User() {
  const { user, signOut, loading, role } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-500">Carregando sua conta...</p>
      </div>
    );
  }

  if (!user) {
    setLocation("/login");
  }
  const displayName =
    user.displayName || (user.email ? user.email.split("@")[0] : "Usuário");

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center bg-gray-50 ">

        <div className="max-w-xl mx-auto ">
          {/* TÍTULO */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-800">Minha Conta</h1>
          </div>

          {/* CARD PRINCIPAL */}
          <div className="rounded-lg border border-slate-200 bg-white shadow-sm p-6">
            {/* TOPO: AVATAR + NOME */}
            <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-6 mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
                <img
                  src={user.photoURL || DEFAULT_AVATAR}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_AVATAR;
                  }}
                />
              </div>

              <div className="mt-4 sm:mt-0 text-center sm:text-left">
                <p className="text-lg font-semibold text-slate-800">
                  {displayName}
                </p>

                {user.email && (
                  <p className="text-sm text-slate-500 break-all">
                    {user.email}
                  </p>
                )}

                <div className="mt-2">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${user.emailVerified
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                  >
                    {user.emailVerified ? "Email verificado" : "Email não verificado"}
                  </span>
                </div>
              </div>
            </div>

            {/* LINHAS DE INFO */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start justify-between gap-4">
                <span className="text-slate-500">UID</span>
                <span className="font-mono text-xs text-slate-700 break-all">
                  {user.uid}
                </span>
              </div>

              {user.phoneNumber && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">Telefone</span>
                  <span className="text-slate-800">{user.phoneNumber}</span>
                </div>
              )}

              {user.providerData?.length > 0 && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">Login via</span>
                  <span className="text-slate-800 text-xs">
                    {user.providerData.map((p) => p.providerId).join(", ")}
                  </span>
                </div>
              )}

              {role && (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">Permissão</span>
                  <span className="text-slate-800 text-xs">
                    {role}
                  </span>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={
                  () => {
                    setLocation("/");
                  }
                }
                className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 shadow transition"
              >
                Home
              </button>
              <button
                onClick={
                  () => {
                    signOut();
                    setLocation("/");
                  }
                }
                className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 shadow transition"
              >
                Sair da conta
              </button>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 text-center">
            Você está conectado!
          </p>
        </div>
      </div>
    </>


  );
}