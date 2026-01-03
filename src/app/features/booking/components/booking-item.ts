import { ChangeDetectionStrategy, Component, input, output, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Card } from '../../../shared/cards/card';
import { BookingConfirmationDialog } from './booking-confirmation-dialog';
import { BookingCancelSuccess } from './booking-cancel-success';
import { Reservation } from '../models/reservation-model';

const classLabels = {
  economy: '💺 Économique',
  business: '💼 Affaires',
  first: '👑 Première',
};

@Component({
  selector: 'app-booking-item',
  imports: [DatePipe, Card, BookingConfirmationDialog, BookingCancelSuccess],
  host: {
    '[class.opacity-50]': 'viewModel().isDeleting',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let _vm = viewModel();

    <app-card variant="secondary">
      <div class="space-y-3">
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-semibold text-text text-lg">
              {{ _vm.reservation.firstName }} {{ _vm.reservation.lastName }}
            </h4>
            <p class="text-sm text-text/60">{{ _vm.reservation.email }}</p>
          </div>
          <span
            class="px-3 py-1 bg-primary/20 text-primary text-xs rounded-lg font-semibold border border-primary/30"
          >
            {{ _vm.travelTypeLabel }}
          </span>
        </div>

        <div class="flex items-center gap-2 text-sm">
          <span class="font-semibold text-primary">{{ _vm.reservation.departureCity }}</span>
          <span class="text-text/40">→</span>
          <span class="font-semibold text-primary">{{ _vm.reservation.arrivalCity }}</span>
        </div>

        <div class="text-sm text-text/60 space-y-1">
          <div>
            <span class="font-semibold">Départ:</span>
            {{ _vm.reservation.departureDate | date : 'dd/MM/yyyy' }}
          </div>
          @if (_vm.reservation.returnDate) {
          <div>
            <span class="font-semibold">Retour:</span>
            {{ _vm.reservation.returnDate | date : 'dd/MM/yyyy' }}
          </div>
          }
        </div>

        <div class="flex flex-wrap gap-2 text-xs">
          <span class="px-3 py-1.5 bg-primary/10 text-text rounded-lg border border-primary/20">
            {{ _vm.travelClassLabel }}
          </span>
          @if (_vm.reservation.checkedBaggage) {
          <span class="px-3 py-1.5 bg-primary/10 text-text rounded-lg border border-primary/20">
            🧳 Bagage en soute
          </span>
          } @if (_vm.reservation.additionalPassenger) {
          <span class="px-3 py-1.5 bg-primary/10 text-text rounded-lg border border-primary/20">
            👥 +1 passager
          </span>
          }
        </div>

        @defer (when _vm.showConfirmation) {
        <app-booking-confirmation-dialog
          (confirm)="confirmCancel()"
          (cancel)="cancelConfirmation()"
        />
        }

        @defer (when _vm.cancelSuccess) {
        <app-booking-cancel-success />
        }

        <div class="pt-3 border-t border-primary/20">
          <button
            (click)="requestCancel()"
            [disabled]="_vm.showConfirmation || _vm.isDeleting"
            class="w-full px-4 py-2.5 bg-red/10 text-red rounded-lg border border-red/30
                   hover:bg-red/20 hover:border-red/50 transition-all font-semibold text-sm
                   disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Demander l'annulation de la réservation"
          >
            ❌ Annuler la réservation
          </button>
        </div>
      </div>
    </app-card>
  `,
})
export class BookingItem {
  readonly reservation = input.required<Reservation>();
  readonly cancel = output<void>();

  readonly showConfirmation = signal(false);
  readonly cancelSuccess = signal(false);
  readonly isDeleting = signal(false);

  readonly travelTypeLabel = computed(() =>
    this.reservation().travelType === 'one-way' ? 'Aller simple' : 'Aller-retour'
  );

  readonly travelClassLabel = computed(() => {
    return classLabels[this.reservation().travelClass];
  });

  protected readonly viewModel = computed(() => ({
    reservation: this.reservation(),
    travelTypeLabel: this.travelTypeLabel(),
    travelClassLabel: this.travelClassLabel(),
    showConfirmation: this.showConfirmation(),
    cancelSuccess: this.cancelSuccess(),
    isDeleting: this.isDeleting(),
  }));

  requestCancel(): void {
    this.showConfirmation.set(true);
  }

  cancelConfirmation(): void {
    this.showConfirmation.set(false);
  }

  confirmCancel(): void {
    this.showConfirmation.set(false);
    this.isDeleting.set(true);
    this.cancelSuccess.set(true);

    setTimeout(() => {
      this.cancel.emit();
    }, 2500);
  }
}
