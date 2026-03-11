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
    signInWithGoogle,
    loading,
    user,
  } = useAuth();
  const [, navigate] = useLocation();

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [loading, user, navigate]);


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
          <CardTitle>{"Entrar"}</CardTitle>
          <CardDescription>
            {"Acessar o meu painel"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={handleGoogleSignIn}
            disabled={submitting || loading}
          >
            Continuar com Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}