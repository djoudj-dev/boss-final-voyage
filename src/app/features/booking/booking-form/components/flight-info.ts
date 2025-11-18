import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-flight-info',
  imports: [ReactiveFormsModule],
  standalone: true,
  template: `
    <section>
      <h3 class="text-xl font-bold text-primary mb-5">✈️ Informations du vol</h3>
      @if (formGroup(); as form) {
      <div [formGroup]="form">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <fieldset class="mb-5">
            <label for="departureCity" class="block text-sm font-semibold text-text/90 mb-2">
              Ville de départ <span class="text-red ml-0.5">*</span>
            </label>
            <select
              id="departureCity"
              formControlName="departureCity"
              class="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all"
            >
              <option value="">Sélectionnez une ville</option>
              @for (city of cities(); track city) {
              <option [value]="city">{{ city }}</option>
              }
            </select>
            @if (form.get('departureCity')?.invalid && (form.get('departureCity')?.dirty ||
            form.get('departureCity')?.touched)) {
            <p class="mt-2 text-sm text-red">⚠️ Ce champ est obligatoire</p>
            }
          </fieldset>

          <fieldset class="mb-5">
            <label for="arrivalCity" class="block text-sm font-semibold text-text/90 mb-2">
              Ville d'arrivée <span class="text-red ml-0.5">*</span>
            </label>
            <select
              id="arrivalCity"
              formControlName="arrivalCity"
              class="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all"
            >
              <option value="">Sélectionnez une ville</option>
              @for (city of cities(); track city) {
              <option [value]="city">{{ city }}</option>
              }
            </select>
            @if (form.get('arrivalCity')?.invalid && (form.get('arrivalCity')?.dirty ||
            form.get('arrivalCity')?.touched)) { @if (form.get('arrivalCity')?.errors?.['required'])
            {
            <p class="mt-2 text-sm text-red">⚠️ Ce champ est obligatoire</p>
            } @if (form.get('arrivalCity')?.errors?.['sameCities']) {
            <p class="mt-2 text-sm text-red">
              ⚠️ Les villes de départ et d'arrivée doivent être différentes
            </p>
            } }
          </fieldset>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <fieldset class="mb-5">
            <label for="departureDate" class="block text-sm font-semibold text-text/90 mb-2">
              Date de départ <span class="text-red ml-0.5">*</span>
            </label>
            <input
              id="departureDate"
              type="date"
              formControlName="departureDate"
              [min]="today()"
              class="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all scheme-dark"
            />
            @if (form.get('departureDate')?.invalid && (form.get('departureDate')?.dirty ||
            form.get('departureDate')?.touched)) {
            <p class="mt-2 text-sm text-red">⚠️ Ce champ est obligatoire</p>
            }
          </fieldset>

          @if (isRoundTrip()) {
          <fieldset class="mb-5">
            <label for="returnDate" class="block text-sm font-semibold text-text/90 mb-2">
              Date de retour <span class="text-red ml-0.5">*</span>
            </label>
            <input
              id="returnDate"
              type="date"
              formControlName="returnDate"
              [min]="tomorrow()"
              class="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all scheme-dark"
            />
            @if (form.get('returnDate')?.invalid && (form.get('returnDate')?.dirty ||
            form.get('returnDate')?.touched)) { @if (form.get('returnDate')?.errors?.['required']) {
            <p class="mt-2 text-sm text-red">⚠️ Ce champ est obligatoire</p>
            } @if (form.get('returnDate')?.errors?.['invalidReturnDate']) {
            <p class="mt-2 text-sm text-red">
              ⚠️ La date de retour doit être après la date de départ
            </p>
            } }
          </fieldset>
          }
        </div>
      </div>
      }
    </section>
  `,
})
export class FlightInfo {
  formGroup = input.required<FormGroup>();
  cities = input.required<string[]>();
  today = input.required<string>();
  tomorrow = input.required<string>();
  isRoundTrip = input.required<boolean>();
}
