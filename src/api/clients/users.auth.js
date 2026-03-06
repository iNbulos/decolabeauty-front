export function createUsersClient(api) {
  return {
    list: () => api.get("/auth-users"),
    patch: (data) => api.patch("/auth-users", data),
  };
}