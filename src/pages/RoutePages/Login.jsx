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
    if (!loading && user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
  };

  const handleSubmit = async event => {
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

      navigate("/account");
    } catch (error) {
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
    } catch (error) {
      toast.error(error?.message || "Não foi possível entrar com Google");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-700">
        Carregando...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-4">
          <CardTitle>{isRegister ? "Criar conta" : "Entrar"}</CardTitle>
          <CardDescription>
            {isRegister
              ? "Entre para ter acesso a todas as funcionalidades"
              : "Acessar o meu painel"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="password">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={submitting || loading}
            >
              {isRegister ? "Criar conta" : "Entrar"}
            </Button>
          </form>

          <div className="my-4 flex items-center gap-2 text-xs uppercase text-gray-500">
            <span className="h-px flex-1 bg-gray-200" aria-hidden />
            ou
            <span className="h-px flex-1 bg-gray-200" aria-hidden />
          </div>

          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={handleGoogleSignIn}
            disabled={submitting || loading}
          >
            Continuar com Google
          </Button>

          <div className="mt-6 text-center text-sm text-gray-600">
            {isRegister ? "Já tem uma conta?" : "Ainda não tem conta?"} {" "}
            <button
              type="button"
              className="font-semibold text-primary underline-offset-4 hover:underline"
              onClick={() => setIsRegister(value => !value)}
            >
              {isRegister ? "Entrar" : "Criar conta"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}