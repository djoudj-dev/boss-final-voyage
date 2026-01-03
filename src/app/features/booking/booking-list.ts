import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BookingItem } from './booking-item';
import { Card } from '../../shared/cards/card';
import { LocalStorageReservationService } from './reservation-service';

@Component({
  selector: 'app-booking-list',
  imports: [BookingItem, Card],
  host: { class: 'mt-8' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let _vm = viewModel();

    <h2 class="text-2xl font-bold text-text my-6">
      📋 Mes réservations ({{ _vm.totalReservations }})
    </h2>

    @if (_vm.hasReservations) {
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        @for (reservation of _vm.reservations; track reservation.id) {
          <app-booking-item
            [reservation]="reservation"
            (cancel)="_vm.onCancelReservation(reservation.id)"
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
  private readonly _reservationService = inject(LocalStorageReservationService);

  protected readonly viewModel = this._reservationService.viewModel;
}
