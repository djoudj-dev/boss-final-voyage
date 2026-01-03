import { Component, inject, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingFormContext } from './booking-form-context';
import { TextInput } from '../../shared/forms/text-input';

@Component({
  selector: 'app-additional-passenger',
  imports: [ReactiveFormsModule, TextInput],
  template: `
    <fieldset>
      <legend class="text-xl font-bold text-primary mb-5">👥 Passager supplémentaire</legend>
      <fieldset class="mb-5">
        <legend class="sr-only">Ajouter un passager</legend>
        <label class="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            [checked]="ctx.hasAdditionalPassenger()"
            (change)="onToggle($event)"
            class="w-4 h-4 text-primary bg-background/50 border-primary/40 rounded focus:ring-2 focus:ring-primary transition-all"
          />
          <span class="ml-2 text-text group-hover:text-primary transition-colors"
            >Ajouter un passager supplémentaire</span
          >
        </label>
      </fieldset>

      @if (ctx.hasAdditionalPassenger()) {
      <fieldset [formGroup]="ctx.additionalPassengerGroup()" class="space-y-4 pl-4 border-l-2 border-primary/30">
        <legend class="sr-only">Informations du passager supplémentaire</legend>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <app-text-input
            formControlName="firstName"
            label="Prénom"
            [required]="true"
          />

          <app-text-input
            formControlName="lastName"
            label="Nom"
            [required]="true"
          />

          <app-text-input
            formControlName="age"
            type="number"
            label="Âge"
            [required]="true"
          />
        </div>
      </fieldset>
      }
    </fieldset>
  `,
})
export class AdditionalPassenger {
  protected readonly ctx = inject(BookingFormContext);
  readonly togglePassenger = output<Event>();

  onToggle(event: Event): void {
    this.togglePassenger.emit(event);
  }
}
