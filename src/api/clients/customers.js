export function createCustomersClient(api) {
  return {
    list: () => api.get("/customer")
  };
}