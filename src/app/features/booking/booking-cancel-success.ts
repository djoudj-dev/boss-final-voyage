import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-booking-cancel-success',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-primary/20 text-text px-4 py-3 mt-3 rounded-xl shadow-xl border border-primary/40 flex items-center gap-3"
      role="alert"
    >
      <span class="text-xl">✅</span>
      <span class="text-sm font-semibold">Réservation en cours d'annulation...</span>
    </div>
  `,
})
export class BookingCancelSuccess {}
