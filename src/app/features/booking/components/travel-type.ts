import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingFormContext } from '../services/booking-form-context';

@Component({
  selector: 'app-travel-type',
  imports: [ReactiveFormsModule],
  template: `
    <fieldset [formGroup]="ctx.form" class="mb-5">
      <legend class="text-xl font-bold text-primary mb-5">🎫 Type de voyage</legend>
      <label class="block text-sm font-semibold text-text/90 mb-2">
        Type de trajet <span class="text-red ml-0.5">*</span>
      </label>
      <div class="flex gap-4">
        <label class="flex items-center cursor-pointer group">
          <input
            type="radio"
            formControlName="travelType"
            value="one-way"
            class="w-4 h-4 text-primary bg-background/50 border-primary/40 focus:ring-2 focus:ring-primary transition-all"
          />
          <span class="ml-2 text-text group-hover:text-primary transition-colors"
            >Aller simple</span
          >
        </label>
        <label class="flex items-center cursor-pointer group">
          <input
            type="radio"
            formControlName="travelType"
            value="round-trip"
            class="w-4 h-4 text-primary bg-background/50 border-primary/40 focus:ring-2 focus:ring-primary transition-all"
          />
          <span class="ml-2 text-text group-hover:text-primary transition-colors"
            >Aller-retour</span
          >
        </label>
      </div>
    </fieldset>
  `,
})
export class TravelType {
  protected readonly ctx = inject(BookingFormContext);
}
