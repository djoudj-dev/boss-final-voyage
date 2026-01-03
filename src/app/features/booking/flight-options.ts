import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingFormContext } from './booking-form-context';
import { SelectInput } from '../../shared/forms/select-input';

@Component({
  selector: 'app-flight-options',
  imports: [ReactiveFormsModule, SelectInput],
  template: `
    <fieldset [formGroup]="ctx.form" class="space-y-4">
      <legend class="text-xl font-bold text-primary mb-5">⚙️ Options du vol</legend>
      <label class="flex items-center cursor-pointer group">
        <input
          type="checkbox"
          formControlName="checkedBaggage"
          class="w-4 h-4 text-primary bg-background/50 border-primary/40 rounded focus:ring-2 focus:ring-primary transition-all"
        />
        <span class="ml-2 text-text group-hover:text-primary transition-colors"
          >Bagage en soute</span
        >
      </label>

      <app-select-input
        formControlName="travelClass"
        label="Classe de voyage"
        [options]="travelClassOptions"
        [required]="false"
      />
    </fieldset>
  `,
})
export class FlightOptions {
  protected readonly ctx = inject(BookingFormContext);

  protected readonly travelClassOptions = [
    { value: 'economy', label: 'Économique' },
    { value: 'business', label: 'Affaires' },
    { value: 'first', label: 'Première classe' },
  ];
}
