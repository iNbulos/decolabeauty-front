import { createApiClient } from "./core/apiClient";
import { createUsersClient } from "./clients/users.auth";
import { createAppointmentsClient } from "./clients/appointments";
import { createCustomersClient } from "./clients/customers";

export const api = createApiClient(import.meta.env.VITE_API_URL);
export const usersApi = createUsersClient(api);
export const appointmentsApi = createAppointmentsClient(api);
export const customersApi = createCustomersClient(api);