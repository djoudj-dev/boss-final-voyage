import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingFormContext } from './booking-form-context';
import { TextInput } from '../../shared/forms/text-input';

@Component({
  selector: 'app-personal-info',
  imports: [ReactiveFormsModule, TextInput],
  template: `
    <fieldset [formGroup]="ctx.form">
      <legend class="text-xl font-bold text-primary mb-5">👤 Informations personnelles</legend>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <app-text-input
          formControlName="firstName"
          label="Prénom"
          placeholder="Jean"
          [required]="true"
        />

        <app-text-input
          formControlName="lastName"
          label="Nom"
          placeholder="Dupont"
          [required]="true"
        />

        <app-text-input
          formControlName="email"
          type="email"
          label="Email"
          placeholder="jean.dupont@example.com"
          [required]="true"
        />

        <app-text-input
          formControlName="phone"
          type="tel"
          label="Téléphone"
          placeholder="06 12 34 56 78"
          patternError="⚠️ Format de téléphone invalide (ex: 06 12 34 56 78)"
        />
      </div>
    </fieldset>
  `,
})
export class PersonalInfo {
  protected readonly ctx = inject(BookingFormContext);
}
