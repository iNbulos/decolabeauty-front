export function createAppointmentsClient(api) {
  return {
    list: () => api.get("/appointments")
  };
}