import { useEffect, useState } from "react";
import { api, usersApi } from "../api";
import { useAuth } from "../contexts/AuthContext";
import { Card, CardContent } from "../components/ui/card";

export default function UsersPage() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const { getIdToken } = useAuth();

    useEffect(() => {
        async function load() {
            try {
                const token = await getIdToken();
                api.setToken(token);
                const data = await usersApi.list();
                setUsers(data);
            } catch (err) {
                console.log("Erro:", err);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
                <Card className="w-full max-w-sm shadow-lg rounded-2xl">
                    <CardContent className="flex flex-col items-center justify-center gap-3 p-6">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
                        <p className="text-sm text-gray-600">Carregando...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-full shadow-lg rounded-2xl">
                <CardContent className="flex flex-col items-center justify-center gap-3 p-6">
                    <pre>{JSON.stringify(users, null, 2)}</pre>
                </CardContent>
            </Card>
        </div>
    );
}