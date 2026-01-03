import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BookingForm } from './features/booking/components/booking-form';
import { BookingList } from './features/booking/components/booking-list';
import { Toast } from './shared/toast/toast';

@Component({
  selector: 'app-root',
  imports: [BookingForm, BookingList, Toast],
  host: { class: 'min-h-screen bg-background' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="bg-background border-b border-primary/30">
      <div class="container mx-auto px-4 pt-8">
        <h1 class="text-4xl font-black text-center text-primary">✈️ Prépare ton voyage ✈️</h1>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8 max-w-3xl bg-background">
      <app-booking-form />
      <app-booking-list />
    </main>

    <footer class="bg-background mt-8 py-6 border-t border-primary/10">
      <div class="container mx-auto px-4 text-center text-text/60 text-sm">
        <p>🅰️ Développé avec Angular par Julien N. 👑</p>
      </div>
    </footer>

    <app-toast />
  `,
})
export class App {}
