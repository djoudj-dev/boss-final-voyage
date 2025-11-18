import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  effect,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Card } from '../../../shared/cards/card';
import { PersonalInfo } from './components/personal-info';
import { TravelType as TravelTypeComponent } from './components/travel-type';
import { FlightInfo } from './components/flight-info';
import { AdditionalPassenger } from './components/additional-passenger';
import { FlightOptions } from './components/flight-options';
import { ReservationService } from '../services/reservation-service';
import { ReservationFormValue, TravelType, TravelClass } from '../models/reservation-model';

interface AdditionalPassengerForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  age: FormControl<string | null>;
}

@Component({
  selector: 'app-booking-form',
  imports: [
    ReactiveFormsModule,
    Card,
    PersonalInfo,
    TravelTypeComponent,
    FlightInfo,
    AdditionalPassenger,
    FlightOptions,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block mb-8' },
  template: `
    <app-card title="📋 Formulaire de réservation" [elevated]="true">
      <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" class="space-y-8">
        <app-personal-info [formGroup]="bookingForm" />

        <app-travel-type [formGroup]="bookingForm" />

        <app-flight-info
          [formGroup]="bookingForm"
          [cities]="cities()"
          [today]="today"
          [tomorrow]="tomorrow"
          [isRoundTrip]="isRoundTrip()"
        />

        <app-additional-passenger
          [hasAdditionalPassenger]="hasAdditionalPassenger()"
          [passengerGroup]="additionalPassengerGroup()"
          (togglePassenger)="toggleAdditionalPassenger($event)"
        />

        <app-flight-options [formGroup]="bookingForm" />

        @if (inlineToast()) {
        <div [class]="getInlineToastClasses()" role="alert">
          <span>{{ inlineToast()!.message }}</span>
          <button
            type="button"
            (click)="inlineToast.set(null)"
            class="ml-4 font-bold hover:opacity-70 transition-opacity"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>
        }

        <div class="flex gap-4 pt-4">
          <button
            type="submit"
            [disabled]="bookingForm.invalid"
            class="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(138,43,226,0.6)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ✅ Réserver
          </button>

          <button
            type="button"
            (click)="resetForm()"
            [disabled]="bookingForm.pristine"
            class="px-6 py-3 border-2 border-primary/50 text-text rounded-lg font-bold hover:bg-primary/10 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            🔄 Réinitialiser
          </button>
        </div>
      </form>
    </app-card>
  `,
})
export class BookingForm {
  private fb = inject(FormBuilder);
  private reservationService = inject(ReservationService);

  inlineToast = signal<{ message: string; type: 'success' | 'error' } | null>(null);
  hasAdditionalPassenger = signal(false);
  isRoundTrip = signal(false);

  cities = signal([
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

  bookingForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.pattern(/^0[1-9](\s?\d{2}){4}$/)],
    travelType: ['one-way', Validators.required],
    departureCity: ['', Validators.required],
    arrivalCity: ['', Validators.required],
    departureDate: ['', Validators.required],
    returnDate: [''],
    additionalPassenger: this.fb.group({
      firstName: [''],
      lastName: [''],
      age: [''],
    }),
    checkedBaggage: [false],
    travelClass: ['economy', Validators.required],
  });

  private departureDate = toSignal(this.bookingForm.get('departureDate')!.valueChanges);
  private departureCity = toSignal(this.bookingForm.get('departureCity')!.valueChanges);
  private arrivalCity = toSignal(this.bookingForm.get('arrivalCity')!.valueChanges);
  private travelType = toSignal(this.bookingForm.get('travelType')!.valueChanges);

  additionalPassengerGroup = computed(
    () => this.bookingForm.get('additionalPassenger') as FormGroup<AdditionalPassengerForm>
  );

  private departureCityEffect = effect(() => {
    const departure = this.departureCity();
    const arrival = this.arrivalCity();
    const arrivalCityControl = this.bookingForm.get('arrivalCity');

    if (departure && arrival && departure === arrival) {
      arrivalCityControl?.setErrors({ sameCities: true });
    } else if (arrivalCityControl?.errors?.['sameCities']) {
      const errors = { ...arrivalCityControl.errors };
      delete errors['sameCities'];
      arrivalCityControl.setErrors(Object.keys(errors).length > 0 ? errors : null);
    }
  });

  private travelTypeEffect = effect(() => {
    const value = this.travelType();
    if (value) {
      this.isRoundTrip.set(value === 'round-trip');

      const returnDateControl = this.bookingForm.get('returnDate');
      const departureDate = this.bookingForm.get('departureDate')?.value;

      if (value === 'round-trip') {
        returnDateControl?.setValidators([Validators.required]);

        if (returnDateControl?.value && departureDate && returnDateControl.value <= departureDate) {
          returnDateControl.setErrors({ invalidReturnDate: true });
        }
      } else {
        returnDateControl?.clearValidators();
        returnDateControl?.setValue('');
      }
      returnDateControl?.updateValueAndValidity();
    }
  });

  private departureDateEffect = effect(() => {
    const departureDate = this.departureDate();
    const returnDateControl = this.bookingForm.get('returnDate');

    if (returnDateControl?.value && departureDate && returnDateControl.value <= departureDate) {
      returnDateControl.setErrors({ invalidReturnDate: true });
    } else if (returnDateControl?.errors?.['invalidReturnDate']) {
      returnDateControl.setErrors(null);
    }

    returnDateControl?.updateValueAndValidity();
  });

  toggleAdditionalPassenger(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.hasAdditionalPassenger.set(checked);

    const group = this.additionalPassengerGroup();
    if (checked) {
      group.get('firstName')?.setValidators(Validators.required);
      group.get('lastName')?.setValidators(Validators.required);
      group
        .get('age')
        ?.setValidators([Validators.required, Validators.min(0), Validators.max(120)]);
    } else {
      group.get('firstName')?.clearValidators();
      group.get('lastName')?.clearValidators();
      group.get('age')?.clearValidators();
      group.reset();
    }
    group.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const formValue = this.bookingForm.getRawValue();

      const reservationData: ReservationFormValue = {
        firstName: formValue.firstName!,
        lastName: formValue.lastName!,
        email: formValue.email!,
        phone: formValue.phone || undefined,
        travelType: formValue.travelType! as TravelType,
        departureCity: formValue.departureCity!,
        arrivalCity: formValue.arrivalCity!,
        departureDate: new Date(formValue.departureDate!),
        returnDate: formValue.returnDate ? new Date(formValue.returnDate) : undefined,
        additionalPassenger: this.hasAdditionalPassenger()
          ? {
              firstName: formValue.additionalPassenger.firstName!,
              lastName: formValue.additionalPassenger.lastName!,
              age: Number(formValue.additionalPassenger.age),
            }
          : undefined,
        checkedBaggage: formValue.checkedBaggage!,
        travelClass: formValue.travelClass! as TravelClass,
      };

      this.reservationService.addReservation(reservationData);
      this.resetForm();

      this.showInlineToast('Réservation enregistrée avec succès !', 'success');
    } else {
      this.showInlineToast('Veuillez corriger les erreurs du formulaire', 'error');
    }
  }

  private showInlineToast(message: string, type: 'success' | 'error'): void {
    this.inlineToast.set({ message, type });
    setTimeout(() => this.inlineToast.set(null), 4000);
  }

  getInlineToastClasses(): string {
    const type = this.inlineToast()?.type;
    const base =
      'px-6 py-4 rounded-xl flex items-center justify-between transition-all animate-slideDown border';
    const variants = {
      success: 'bg-primary/20 text-text border-primary/40 shadow-xl shadow-primary/20',
      error: 'bg-red/20 text-text border-red/40 shadow-xl shadow-red/20',
    };
    return `${base} ${variants[type!]}`;
  }

  resetForm(): void {
    this.bookingForm.reset({
      travelType: 'one-way',
      checkedBaggage: false,
      travelClass: 'economy',
    });
    this.hasAdditionalPassenger.set(false);
    this.isRoundTrip.set(false);
  }
}
