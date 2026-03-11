import { useEffect, useState } from "react";
import { api, usersApi } from "../../api";
import { useAuth } from "../../contexts/AuthContext";
import UserAccordionCard from "../../components/UserAccordionCard";
import Navbar from "@/components/Navbar";
import CardLoading from "@/components/CardLoading";


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
                setUsers(data.users);
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
            <CardLoading/>
        );
    }


    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-4xl space-y-4 p-6">
                {users.map((user) => (
                    <UserAccordionCard key={user.uid} user={user} />
                ))}
            </div>
        </>

    );
}