export function createApiClient(baseURL) {
    let token = "";

    function setToken(newToken) {
        token = newToken || "";
    }

    async function request(method, path, body) {
        const res = await fetch(baseURL + path, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw errData; // ou: throw new Error(errData.message || "Erro");
        }

        return res.json();
    }

    return {
        setToken,
        get: (path) => request("GET", path),
        post: (path, body) => request("POST", path, body),
        patch: (path, body) => request("PATCH", path, body),
        del: (path) => request("DELETE", path),
    };
}