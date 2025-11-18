import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BookingItem } from '../booking-item/booking-item';
import { Card } from '../../../shared/cards/card';
import { ReservationService } from '../services/reservation-service';

@Component({
  selector: 'app-booking-list',
  imports: [BookingItem, Card],
  host: { class: 'mt-8' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 class="text-2xl font-bold text-text my-6">
      📋 Mes réservations ({{ reservationService.totalReservations() }})
    </h2>

    @if (reservationService.hasReservations()) {
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      @for (reservation of reservationService.reservations(); track reservation.id) {
      <app-booking-item
        [reservation]="reservation"
        (cancel)="onCancelReservation(reservation.id)"
      />
      }
    </div>
    } @else {
    <app-card variant="default">
      <div class="text-center py-12 text-text/50">
        <p class="text-6xl mb-6">✈️</p>
        <p class="text-xl font-semibold mb-2 text-text/70">Aucune réservation pour le moment</p>
        <p class="text-sm text-text/50">
          Remplissez le formulaire ci-dessus pour créer votre première réservation
        </p>
      </div>
    </app-card>
    }
  `,
})
export class BookingList {
  reservationService = inject(ReservationService);

  onCancelReservation(id: string): void {
    this.reservationService.removeReservation(id);
  }
}
