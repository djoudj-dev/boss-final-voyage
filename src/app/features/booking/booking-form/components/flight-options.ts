import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-flight-options',
  imports: [ReactiveFormsModule],
  standalone: true,
  template: `
    <section>
      <h3 class="text-xl font-bold text-primary mb-5">⚙️ Options du vol</h3>
      @if (formGroup(); as form) {
      <fieldset [formGroup]="form" class="space-y-4">
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

        <div class="mb-5">
          <label for="travelClass" class="block text-sm font-semibold text-text/90 mb-2">
            Classe de voyage <span class="text-red ml-0.5">*</span>
          </label>
          <select
            id="travelClass"
            formControlName="travelClass"
            class="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all"
          >
            <option value="economy">Économique</option>
            <option value="business">Affaires</option>
            <option value="first">Première classe</option>
          </select>
        </div>
      </fieldset>
      }
    </section>
  `,
})
export class FlightOptions {
  formGroup = input.required<FormGroup>();
}
