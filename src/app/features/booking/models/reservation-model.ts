export type TravelType = 'one-way' | 'round-trip';
export type TravelClass = 'economy' | 'business' | 'first';

export interface AdditionalPassenger {
  firstName: string;
  lastName: string;
  age: number;
}

export interface Reservation {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;

  travelType: TravelType;

  departureCity: string;
  arrivalCity: string;
  departureDate: Date;
  returnDate?: Date;

  additionalPassenger?: AdditionalPassenger;

  checkedBaggage: boolean;
  travelClass: TravelClass;

  createdAt: Date;
}

export interface ReservationFormValue extends Omit<Reservation, 'id' | 'createdAt'> {}
