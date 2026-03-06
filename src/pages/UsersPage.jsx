import { useEffect, useState } from "react";
import { api, usersApi } from "../api";
import { useAuth } from "../contexts/AuthContext";

export default function UsersPage() {
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
            }
        }

        load();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <pre>{JSON.stringify(users, null, 2)}</pre>
        </div>
    );
}