// src/api/appointmentApi.ts

import api from "./api";
import { AppointmentStatus } from "../types/AppointmentStatus";
import { ITermin } from "../interface/ITermin";

export type { AppointmentStatus };

export interface AppointmentPage {
    content: ITermin[];
    totalPages: number;
    totalElements: number;
    number: number;
}

export const fetchAppointments = (
    status?: AppointmentStatus,
    page = 0,
    size = 5
): Promise<AppointmentPage> =>
    api.get<AppointmentPage>("/appointments", {
        params: { ...(status ? { status } : {}), page, size },
    }).then((r) => r.data);

export const fetchAppointmentById = (id: number): Promise<ITermin> =>
    api.get<ITermin>(`/appointments/${id}`).then((r) => r.data);

export const createAppointment = (
    body: Omit<ITermin, "id" | "status">
): Promise<ITermin> =>
    api.post<ITermin>("/appointments", body).then((r) => r.data);

export const updateAppointmentStatus = (
    id: number,
    status: AppointmentStatus
): Promise<ITermin> =>
    api.patch<ITermin>(`/appointments/${id}/status`, { status })
        .then((r) => r.data);

export const deleteAppointment = (id: number): Promise<void> =>
    api.delete(`/appointments/${id}`).then(() => undefined);