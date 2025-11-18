import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  imports: [ReactiveFormsModule],
  standalone: true,
  template: `
    <section>
      <h3 class="text-xl font-bold text-primary mb-5">👤 Informations personnelles</h3>
      @if (formGroup(); as form) {
      <div [formGroup]="form" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <fieldset class="mb-5">
          <label for="firstName" class="block text-sm font-semibold text-text/90 mb-2">
            Prénom <span class="text-red ml-0.5">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            formControlName="firstName"
            class="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all"
            placeholder="Jean"
          />
          @if (form.get('firstName')?.invalid && (form.get('firstName')?.dirty ||
          form.get('firstName')?.touched)) {
          <p class="mt-2 text-sm text-red">⚠️ Ce champ est obligatoire</p>
          }
        </fieldset>

        <fieldset class="mb-5">
          <label for="lastName" class="block text-sm font-semibold text-text/90 mb-2">
            Nom <span class="text-red ml-0.5">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            formControlName="lastName"
            class="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all"
            placeholder="Dupont"
          />
          @if (form.get('lastName')?.invalid && (form.get('lastName')?.dirty ||
          form.get('lastName')?.touched)) {
          <p class="mt-2 text-sm text-red">⚠️ Ce champ est obligatoire</p>
          }
        </fieldset>

        <fieldset class="mb-5">
          <label for="email" class="block text-sm font-semibold text-text/90 mb-2">
            Email <span class="text-red ml-0.5">*</span>
          </label>
          <input
            id="email"
            type="email"
            formControlName="email"
            class="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all"
            placeholder="jean.dupont@example.com"
          />
          @if (form.get('email')?.invalid && (form.get('email')?.dirty ||
          form.get('email')?.touched)) { @if (form.get('email')?.errors?.['required']) {
          <p class="mt-2 text-sm text-red">⚠️ Ce champ est obligatoire</p>
          } @if (form.get('email')?.errors?.['email']) {
          <p class="mt-2 text-sm text-red">⚠️ Format d'email invalide</p>
          } }
        </fieldset>

        <fieldset class="mb-5">
          <label for="phone" class="block text-sm font-semibold text-text/90 mb-2">
            Téléphone
          </label>
          <input
            id="phone"
            type="tel"
            formControlName="phone"
            class="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all"
            placeholder="06 12 34 56 78"
          />
          @if (form.get('phone')?.invalid && (form.get('phone')?.dirty ||
          form.get('phone')?.touched)) {
          <p class="mt-2 text-sm text-red">⚠️ Format de téléphone invalide (ex: 06 12 34 56 78)</p>
          }
        </fieldset>
      </div>
      }
    </section>
  `,
})
export class PersonalInfo {
  formGroup = input.required<FormGroup>();
}
