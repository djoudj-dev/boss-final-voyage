import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Card } from '../../../shared/cards/card';
import { Reservation } from '../models/reservation-model';

@Component({
  selector: 'app-booking-item',
  imports: [DatePipe, Card],
  host: {
    '[class.opacity-50]': 'isDeleting()', // ✅ Feedback visuel pendant la suppression
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-card variant="secondary">
      <div class="space-y-3">
        <!-- En-tête avec infos passager -->
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-semibold text-text text-lg">
              {{ reservation().firstName }} {{ reservation().lastName }}
            </h4>
            <p class="text-sm text-text/60">{{ reservation().email }}</p>
          </div>
          <span
            class="px-3 py-1 bg-primary/20 text-primary text-xs rounded-lg font-semibold border border-primary/30"
          >
            {{ getTravelTypeLabel() }}
          </span>
        </div>

        <!-- Itinéraire -->
        <div class="flex items-center gap-2 text-sm">
          <span class="font-semibold text-primary">{{ reservation().departureCity }}</span>
          <span class="text-text/40">→</span>
          <span class="font-semibold text-primary">{{ reservation().arrivalCity }}</span>
        </div>

        <!-- Dates -->
        <div class="text-sm text-text/60 space-y-1">
          <div>
            <span class="font-semibold">Départ:</span>
            {{ reservation().departureDate | date : 'dd/MM/yyyy' }}
          </div>
          @if (reservation().returnDate) {
          <div>
            <span class="font-semibold">Retour:</span>
            {{ reservation().returnDate | date : 'dd/MM/yyyy' }}
          </div>
          }
        </div>

        <!-- Options -->
        <div class="flex flex-wrap gap-2 text-xs">
          <span class="px-3 py-1.5 bg-primary/10 text-text rounded-lg border border-primary/20">
            {{ getTravelClassLabel() }}
          </span>
          @if (reservation().checkedBaggage) {
          <span class="px-3 py-1.5 bg-primary/10 text-text rounded-lg border border-primary/20">
            🧳 Bagage en soute
          </span>
          } @if (reservation().additionalPassenger) {
          <span class="px-3 py-1.5 bg-primary/10 text-text rounded-lg border border-primary/20">
            👥 +1 passager
          </span>
          }
        </div>

        <!-- ✅ Toast inline de confirmation -->
        @if (showConfirmation()) {
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
              (click)="confirmCancel()"
              class="flex-1 px-4 py-2.5 bg-red text-background rounded-lg font-semibold hover:bg-red/90 hover:shadow-lg hover:shadow-red/30 transition-all"
              aria-label="Confirmer l'annulation"
            >
              Oui, annuler
            </button>
            <button
              (click)="cancelConfirmation()"
              class="flex-1 px-4 py-2.5 bg-background border border-primary/30 text-text rounded-lg font-semibold hover:bg-primary/10 hover:border-primary/50 transition-all"
              aria-label="Conserver la réservation"
            >
              Non, garder
            </button>
          </div>
        </div>
        } @if (cancelSuccess()) {
        <div
          class="bg-primary/20 text-text px-4 py-3 rounded-xl shadow-xl border border-primary/40 flex items-center gap-3"
          role="alert"
        >
          <span class="text-xl">✅</span>
          <span class="text-sm font-semibold">Réservation en cours d'annulation...</span>
        </div>
        }

        <div class="pt-3 border-t border-primary/20">
          <button
            (click)="requestCancel()"
            [disabled]="showConfirmation() || isDeleting()"
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
  reservation = input.required<Reservation>();
  cancel = output<void>();

  showConfirmation = signal(false);
  cancelSuccess = signal(false);
  isDeleting = signal(false);

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

  getTravelTypeLabel(): string {
    return this.reservation().travelType === 'one-way' ? 'Aller simple' : 'Aller-retour';
  }

  getTravelClassLabel(): string {
    const classLabels = {
      economy: '💺 Économique',
      business: '💼 Affaires',
      first: '👑 Première',
    };
    return classLabels[this.reservation().travelClass];
  }
}
