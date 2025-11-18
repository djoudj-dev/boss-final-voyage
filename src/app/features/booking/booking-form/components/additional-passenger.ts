import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-additional-passenger',
  imports: [ReactiveFormsModule],
  standalone: true,
  template: `
    <section>
      <h3 class="text-xl font-bold text-primary mb-5">👥 Passager supplémentaire</h3>
      <fieldset class="mb-5">
        <label class="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            [checked]="hasAdditionalPassenger()"
            (change)="onToggle($event)"
            class="w-4 h-4 text-primary bg-background/50 border-primary/40 rounded focus:ring-2 focus:ring-primary transition-all"
          />
          <span class="ml-2 text-text group-hover:text-primary transition-colors"
            >Ajouter un passager supplémentaire</span
          >
        </label>
      </fieldset>

      @if (hasAdditionalPassenger() && passengerGroup(); as group) {
      <div [formGroup]="group" class="space-y-4 pl-4 border-l-2 border-primary/30">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <fieldset class="mb-5">
            <label for="additionalFirstName" class="block text-sm font-semibold text-text/90 mb-2">
              Prénom <span class="text-red ml-0.5">*</span>
            </label>
            <input
              id="additionalFirstName"
              type="text"
              formControlName="firstName"
              class="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all"
            />
            @if (group.get('firstName')?.invalid && (group.get('firstName')?.dirty ||
            group.get('firstName')?.touched)) {
            <p class="mt-2 text-sm text-red">⚠️ Ce champ est obligatoire</p>
            }
          </fieldset>

          <fieldset class="mb-5">
            <label for="additionalLastName" class="block text-sm font-semibold text-text/90 mb-2">
              Nom <span class="text-red ml-0.5">*</span>
            </label>
            <input
              id="additionalLastName"
              type="text"
              formControlName="lastName"
              class="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all"
            />
            @if (group.get('lastName')?.invalid && (group.get('lastName')?.dirty ||
            group.get('lastName')?.touched)) {
            <p class="mt-2 text-sm text-red">⚠️ Ce champ est obligatoire</p>
            }
          </fieldset>

          <fieldset class="mb-5">
            <label for="additionalAge" class="block text-sm font-semibold text-text/90 mb-2">
              Âge <span class="text-red ml-0.5">*</span>
            </label>
            <input
              id="additionalAge"
              type="number"
              formControlName="age"
              min="0"
              max="120"
              class="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all"
            />
            @if (group.get('age')?.invalid && (group.get('age')?.dirty ||
            group.get('age')?.touched)) { @if (group.get('age')?.errors?.['required']) {
            <p class="mt-2 text-sm text-red">⚠️ Ce champ est obligatoire</p>
            } @if (group.get('age')?.errors?.['min'] || group.get('age')?.errors?.['max']) {
            <p class="mt-2 text-sm text-red">⚠️ L'âge doit être entre 0 et 120 ans</p>
            } }
          </fieldset>
        </div>
      </div>
      }
    </section>
  `,
})
export class AdditionalPassenger {
  hasAdditionalPassenger = input.required<boolean>();
  passengerGroup = input.required<FormGroup>();
  togglePassenger = output<Event>();

  onToggle(event: Event): void {
    this.togglePassenger.emit(event);
  }
}
