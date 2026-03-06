export function createUsersClient(api) {
  return {
    list: () => api.get("/auth-users")
  };
}