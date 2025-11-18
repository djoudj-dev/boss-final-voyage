import { Injectable, signal, computed, effect } from '@angular/core';
import { Reservation, ReservationFormValue } from '../models/reservation-model';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private readonly STORAGE_KEY = 'reservations';

  private reservationsSignal = signal<Reservation[]>(this.loadFromStorage());

  private persistEffect = effect(() => {
    const reservations = this.reservationsSignal();
    this.saveToStorage(reservations);
  });

  reservations = this.reservationsSignal.asReadonly();
  totalReservations = computed(() => this.reservationsSignal().length);
  hasReservations = computed(() => this.reservationsSignal().length > 0);

  private loadFromStorage(): Reservation[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return [];

      const parsed = JSON.parse(data);
      return parsed.map((r: Reservation) => ({
        ...r,
        departureDate: new Date(r.departureDate),
        returnDate: r.returnDate ? new Date(r.returnDate) : undefined,
        createdAt: new Date(r.createdAt),
      }));
    } catch {
      return [];
    }
  }

  private saveToStorage(reservations: Reservation[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reservations));
    } catch (error) {
      console.error('Échec de la persistance des réservations:', error);
    }
  }

  addReservation(formValue: ReservationFormValue): Reservation {
    const reservation: Reservation = {
      ...formValue,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    this.reservationsSignal.update((reservations) => [...reservations, reservation]);
    return reservation;
  }

  removeReservation(id: string): void {
    this.reservationsSignal.update((reservations) => reservations.filter((r) => r.id !== id));
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservationsSignal().find((r) => r.id === id);
  }

  clearAll(): void {
    this.reservationsSignal.set([]);
  }
}
