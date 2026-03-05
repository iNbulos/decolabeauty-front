import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";

import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithGoogle,
    loading,
    user,
  } = useAuth();

  const [, navigate] = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [isRegister, setIsRegister] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/");
  }, [loading, user, navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(form.email, form.password);
        toast.success("Conta criada com sucesso");
      } else {
        await signInWithEmailAndPassword(form.email, form.password);
        toast.success("Login realizado com sucesso");
      }

      // ⚠️ Troque para uma rota que exista no seu App:
      // navigate("/account");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.message || "Não foi possível concluir a ação");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);

    try {
      await signInWithGoogle();
      toast.success("Login realizado com Google");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.message || "Não foi possível entrar com Google");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-gradient-to-b from-gray-50 to-white text-gray-700">
        <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm shadow-sm">
          Carregando...
        </div>
      </div>
    );
  }

  const disabled = submitting || loading;

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-b from-gray-50 to-white px-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            {isRegister ? "Criar conta" : "Entrar"}
          </CardTitle>
          <CardDescription>
            {isRegister
              ? "Crie sua conta usando email e senha."
              : "Entre com seu email e senha para continuar."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="voce@exemplo.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
                disabled={disabled}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                {/* Se você tiver reset de senha, dá pra ligar aqui */}
                {/* <button type="button" className="text-xs text-muted-foreground hover:underline">
                  Esqueci minha senha
                </button> */}
              </div>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete={isRegister ? "new-password" : "current-password"}
                required
                disabled={disabled}
                minLength={6}
              />
              {isRegister && (
                <p className="text-xs text-muted-foreground">
                  Use pelo menos 6 caracteres.
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={disabled}>
              {disabled
                ? "Processando..."
                : isRegister
                ? "Criar conta"
                : "Entrar"}
            </Button>
          </form>

          <div className="relative py-1">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-muted-foreground">
              ou
            </span>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={disabled}
          >
            Continuar com Google
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            {isRegister ? "Já tem conta?" : "Ainda não tem conta?"}{" "}
            <button
              type="button"
              className="font-medium text-primary hover:underline"
              onClick={() => setIsRegister((v) => !v)}
              disabled={disabled}
            >
              {isRegister ? "Entrar" : "Criar conta"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}