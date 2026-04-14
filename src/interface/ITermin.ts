
import { AppointmentStatus } from "../types/AppointmentStatus";

export interface ITermin {
    id: number;
    customerId: number;
    customerName: string;
    serviceType: string;
    date: string;           // "YYYY-MM-DD"
    time: string;           // "HH:mm"
    brand: string;
    model: string;
    year: number | null;
    licensePlate: string;
    status: AppointmentStatus;
    price: number | null;
    note: string;
    createdAt: string;
}