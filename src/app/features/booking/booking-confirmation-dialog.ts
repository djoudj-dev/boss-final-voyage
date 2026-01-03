import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-booking-confirmation-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-red/20 text-text px-4 py-4 rounded-xl shadow-xl border border-red/40"
      role="alertdialog"
      aria-labelledby="confirm-title"
    >
      <p id="confirm-title" class="text-sm font-semibold mb-4 flex items-center gap-2">
        <span class="text-lg">⚠️</span>
        Êtes-vous sûr de vouloir annuler cette réservation ?
      </p>
      <div class="flex gap-3">
        <button
          (click)="confirm.emit()"
          class="flex-1 px-4 py-2.5 bg-error text-white rounded-lg font-semibold hover:bg-error-hover hover:shadow-lg hover:shadow-error/30 transition-all"
          aria-label="Confirmer l'annulation"
        >
          Oui, annuler
        </button>
        <button
          (click)="cancel.emit()"
          class="flex-1 px-4 py-2.5 bg-surface border border-border-focus text-text rounded-lg font-semibold hover:bg-surface-hover hover:border-primary transition-all"
          aria-label="Conserver la réservation"
        >
          Non, garder
        </button>
      </div>
    </div>
  `,
})
export class BookingConfirmationDialog {
  readonly confirm = output<void>();
  readonly cancel = output<void>();
}
