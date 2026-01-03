import { Component, inject, computed } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { BookingFormContext } from '../services/booking-form-context';
import { SelectInput } from '../../../shared/forms/select-input';
import { DateInput } from '../../../shared/forms/date-input';

@Component({
  selector: 'app-flight-info',
  imports: [ReactiveFormsModule, SelectInput, DateInput],
  template: `
    <fieldset [formGroup]="ctx.form">
      <legend class="text-xl font-bold text-primary mb-5">✈️ Informations du vol</legend>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <app-select-input
          formControlName="departureCity"
          label="Ville de départ"
          [options]="cityOptions()"
          placeholder="Sélectionnez une ville"
          [required]="true"
        />

        <app-select-input
          formControlName="arrivalCity"
          label="Ville d'arrivée"
          [options]="cityOptions()"
          placeholder="Sélectionnez une ville"
          [required]="true"
          [customError]="sameCityErrorMessage()"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <app-date-input
          formControlName="departureDate"
          label="Date de départ"
          [min]="ctx.today"
          [required]="true"
        />

        @if (ctx.isRoundTrip()) {
        <app-date-input
          formControlName="returnDate"
          label="Date de retour"
          [min]="ctx.tomorrow"
          [required]="true"
        />
        }
      </div>
    </fieldset>
  `,
})
export class FlightInfo {
  protected readonly ctx = inject(BookingFormContext);

  protected readonly cityOptions = computed(() =>
    this.ctx.cities().map(city => ({ value: city, label: city }))
  );

  private readonly departureCityValue = toSignal(this.ctx.form.controls.departureCity.valueChanges);
  private readonly arrivalCityValue = toSignal(this.ctx.form.controls.arrivalCity.valueChanges);
  private readonly arrivalCityStatus = toSignal(this.ctx.form.controls.arrivalCity.statusChanges);

  protected readonly sameCityErrorMessage = computed(() => {
    this.departureCityValue();
    this.arrivalCityValue();
    this.arrivalCityStatus();

    const arrivalCityControl = this.ctx.form.controls.arrivalCity;
    const departureCityControl = this.ctx.form.controls.departureCity;

    const hasSameCityError = arrivalCityControl.hasError('sameCities') &&
                             departureCityControl.value &&
                             arrivalCityControl.value;

    return hasSameCityError ? 'La ville d\'arrivée doit être différente de la ville de départ' : null;
  });
}
