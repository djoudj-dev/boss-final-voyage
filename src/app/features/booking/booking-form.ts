import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Card } from '../../shared/cards/card';
import { PersonalInfo } from './personal-info';
import { TravelType as TravelTypeComponent } from './travel-type';
import { FlightInfo } from './flight-info';
import { AdditionalPassenger } from './additional-passenger';
import { FlightOptions } from './flight-options';
import { BookingFormContext } from './booking-form-context';

@Component({
  selector: 'app-booking-form',
  imports: [
    ReactiveFormsModule,
    Card,
    PersonalInfo,
    TravelTypeComponent,
    FlightInfo,
    AdditionalPassenger,
    FlightOptions,
  ],
  viewProviders: [BookingFormContext],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block mb-8' },
  template: `
    @let _vm = viewModel();

    <app-card title="📋 Formulaire de réservation" [elevated]="true">
      <form [formGroup]="_vm.form" (ngSubmit)="onSubmit()" class="space-y-8">
        <app-personal-info />

        <app-travel-type />

        <app-flight-info />

        <app-additional-passenger (togglePassenger)="toggleAdditionalPassenger($event)" />

        <app-flight-options />

        <div class="flex gap-4 pt-4">
          <button
            type="submit"
            [disabled]="_vm.isFormInvalid"
            class="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(138,43,226,0.6)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ✅ Réserver
          </button>

          <button
            type="button"
            (click)="resetForm()"
            [disabled]="_vm.isFormPristine"
            class="px-6 py-3 border-2 border-primary/50 text-text rounded-lg font-bold hover:bg-primary/10 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            🔄 Réinitialiser
          </button>
        </div>
      </form>
    </app-card>
  `,
})
export class BookingForm {
  protected readonly ctx = inject(BookingFormContext);
  protected readonly viewModel = this.ctx.viewModel;

  toggleAdditionalPassenger(event: Event): void {
    this.ctx.toggleAdditionalPassenger(event);
  }

  onSubmit(): void {
    this.ctx.onSubmit();
  }

  resetForm(): void {
    this.ctx.resetForm();
  }
}
