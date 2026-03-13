export function createEntitlementsClient(api) {
  return {
    list: () => api.get("/entitlements")
  };
}