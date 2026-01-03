import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageReservationService } from './reservation-service';
import { ToastService } from '../../shared/toast/toast-service';
import { ReservationFormValue, TravelType, TravelClass } from './reservation-model';

interface AdditionalPassengerForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  age: FormControl<string>;
}

interface BookingFormControls {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  travelType: FormControl<TravelType>;
  departureCity: FormControl<string>;
  arrivalCity: FormControl<string>;
  departureDate: FormControl<string>;
  returnDate: FormControl<string>;
  additionalPassenger: FormGroup<AdditionalPassengerForm>;
  checkedBaggage: FormControl<boolean>;
  travelClass: FormControl<TravelClass>;
}

@Injectable()
export class BookingFormContext {
  private readonly _fb = inject(FormBuilder);
  private readonly _reservationService = inject(LocalStorageReservationService);
  private readonly _toastService = inject(ToastService);

  readonly hasAdditionalPassenger = signal(false);
  readonly isRoundTrip = signal(false);

  readonly cities = signal([
    'Paris',
    'Lyon',
    'Marseille',
    'Toulouse',
    'Nice',
    'Nantes',
    'Bordeaux',
    'Strasbourg',
    'Lille',
    'Rennes',
  ]);

  readonly today = new Date().toISOString().split('T')[0];
  readonly tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  readonly form: FormGroup<BookingFormControls> = this._fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.pattern(/^0[1-9](\s?\d{2}){4}$/)],
    travelType: ['one-way' as TravelType, Validators.required],
    departureCity: ['', Validators.required],
    arrivalCity: ['', Validators.required],
    departureDate: ['', Validators.required],
    returnDate: [''],
    additionalPassenger: this._fb.nonNullable.group({
      firstName: [''],
      lastName: [''],
      age: [''],
    }),
    checkedBaggage: [false],
    travelClass: ['economy' as TravelClass],
  });

  private readonly _departureDate = toSignal(this.form.controls.departureDate.valueChanges);
  private readonly _departureCity = toSignal(this.form.controls.departureCity.valueChanges);
  private readonly _arrivalCity = toSignal(this.form.controls.arrivalCity.valueChanges);
  private readonly _travelType = toSignal(this.form.controls.travelType.valueChanges);
  private readonly _formStatus = toSignal(this.form.statusChanges, { initialValue: this.form.status });

  readonly additionalPassengerGroup = computed(() => this.form.controls.additionalPassenger);

  readonly viewModel = computed(() => ({
    cities: this.cities(),
    today: this.today,
    tomorrow: this.tomorrow,
    isRoundTrip: this.isRoundTrip(),
    hasAdditionalPassenger: this.hasAdditionalPassenger(),
    additionalPassengerGroup: this.additionalPassengerGroup(),
    form: this.form,
    isFormInvalid: this._formStatus() === 'INVALID',
    isFormPristine: this.form.pristine,
  }));

  private readonly _departureCityEffect = effect(() => {
    const departure = this._departureCity();
    const arrival = this._arrivalCity();
    const arrivalCityControl = this.form.controls.arrivalCity;

    if (departure && arrival && departure === arrival) {
      arrivalCityControl.setErrors({ sameCities: true });
    } else if (arrivalCityControl.errors?.['sameCities']) {
      const errors = { ...arrivalCityControl.errors };
      delete errors['sameCities'];
      arrivalCityControl.setErrors(Object.keys(errors).length > 0 ? errors : null);
    }
  });

  private readonly _travelTypeEffect = effect(() => {
    const value = this._travelType();
    if (!value) {
      return;
    }
    this.isRoundTrip.set(value === 'round-trip');

    const returnDateControl = this.form.controls.returnDate;
    const departureDate = this.form.controls.departureDate.value;

    if (value === 'round-trip') {
      returnDateControl.setValidators([Validators.required]);

      if (returnDateControl.value && departureDate && returnDateControl.value <= departureDate) {
        returnDateControl.setErrors({ invalidReturnDate: true });
      }
    } else {
      returnDateControl.clearValidators();
      returnDateControl.setValue('');
    }
    returnDateControl.updateValueAndValidity();
  });

  private readonly _departureDateEffect = effect(() => {
    const departureDate = this._departureDate();
    const returnDateControl = this.form.controls.returnDate;

    if (returnDateControl.value && departureDate && returnDateControl.value <= departureDate) {
      returnDateControl.setErrors({ invalidReturnDate: true });
    } else if (returnDateControl.errors?.['invalidReturnDate']) {
      returnDateControl.setErrors(null);
    }

    returnDateControl.updateValueAndValidity();
  });

  toggleAdditionalPassenger(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.hasAdditionalPassenger.set(checked);

    const group = this.additionalPassengerGroup();
    if (checked) {
      group.controls.firstName.setValidators(Validators.required);
      group.controls.lastName.setValidators(Validators.required);
      group.controls.age.setValidators([Validators.required, Validators.min(0), Validators.max(120)]);
    } else {
      group.controls.firstName.clearValidators();
      group.controls.lastName.clearValidators();
      group.controls.age.clearValidators();
      group.reset();
    }
    group.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();

      const reservationData: ReservationFormValue = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phone: formValue.phone || undefined,
        travelType: formValue.travelType,
        departureCity: formValue.departureCity,
        arrivalCity: formValue.arrivalCity,
        departureDate: new Date(formValue.departureDate),
        returnDate: formValue.returnDate ? new Date(formValue.returnDate) : undefined,
        additionalPassenger: this.hasAdditionalPassenger()
          ? {
              firstName: formValue.additionalPassenger.firstName,
              lastName: formValue.additionalPassenger.lastName,
              age: Number(formValue.additionalPassenger.age),
            }
          : undefined,
        checkedBaggage: formValue.checkedBaggage,
        travelClass: formValue.travelClass,
      };

      this._reservationService.addReservation(reservationData);
      this.resetForm();

      this._toastService.success('✅ Réservation enregistrée avec succès !');
    } else {
      this._toastService.error('❌ Veuillez corriger les erreurs du formulaire');
    }
  }

  resetForm(): void {
    this.form.reset({
      travelType: 'one-way',
      checkedBaggage: false,
      travelClass: 'economy',
    });
    this.form.markAsUntouched();
    this.form.markAsPristine();
    this.hasAdditionalPassenger.set(false);
    this.isRoundTrip.set(false);
  }
}
