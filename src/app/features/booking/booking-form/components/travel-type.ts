import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-travel-type',
  imports: [ReactiveFormsModule],
  standalone: true,
  template: `
    <section>
      <h3 class="text-xl font-bold text-primary mb-5">🎫 Type de voyage</h3>
      @if (formGroup(); as form) {
      <fieldset [formGroup]="form" class="mb-5">
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
      }
    </section>
  `,
})
export class TravelType {
  formGroup = input.required<FormGroup>();
}
