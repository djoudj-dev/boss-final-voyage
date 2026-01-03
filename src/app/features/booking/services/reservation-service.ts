import { Injectable, signal, computed, effect } from '@angular/core';
import { Reservation, ReservationFormValue } from '../models/reservation-model';

@Injectable({ providedIn: 'root' })
export class LocalStorageReservationService {
  private readonly _STORAGE_KEY = 'reservations';

  private readonly _reservationsSignal = signal<Reservation[]>(this._loadFromStorage());

  readonly reservations = this._reservationsSignal.asReadonly();
  readonly totalReservations = computed(() => this._reservationsSignal().length);
  readonly hasReservations = computed(() => this.totalReservations() > 0);

  private readonly _syncEffect = effect(() => {
    this._saveToStorage(this._reservationsSignal());
  });

  private readonly _onCancelReservation = (id: string): void => {
    this.removeReservation(id);
  };

  readonly viewModel = computed(() => ({
    reservations: this.reservations(),
    totalReservations: this.totalReservations(),
    hasReservations: this.hasReservations(),
    onCancelReservation: this._onCancelReservation,
  }));

  private _loadFromStorage(): Reservation[] {
    try {
      const data = localStorage.getItem(this._STORAGE_KEY);
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

  private _saveToStorage(reservations: Reservation[]): void {
    try {
      localStorage.setItem(this._STORAGE_KEY, JSON.stringify(reservations));
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

    this._reservationsSignal.update((reservations) => [...reservations, reservation]);
    return reservation;
  }

  removeReservation(id: string): void {
    this._reservationsSignal.update((reservations) => reservations.filter((r) => r.id !== id));
  }
}
