import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type CardVariant = 'default' | 'primary' | 'secondary' | 'accent';

@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article [class]="cardClasses()">
      @if (title()) {
      <header class="border-b border-text/10 pb-3 mb-4">
        <h3 class="text-2xl font-semibold text-text">{{ title() }}</h3>
      </header>
      }

      <ng-content />
    </article>
  `,
  host: { class: 'block' },
})
export class Card {
  variant = input<CardVariant>('default');
  title = input<string>('');
  elevated = input(false);

  cardClasses(): string {
    const variants = {
      default: 'bg-secondary/95 border-primary/40 backdrop-blur-md',
      primary: 'bg-primary/10 border-primary/60',
      secondary: 'bg-secondary border-secondary/60',
      accent: 'bg-accent/10 border-accent/60',
    };

    return [
      'rounded-2xl border-2 p-6 text-text transition-all hover:border-primary hover:shadow-[0_0_30px_rgba(138,43,226,0.3)]',
      variants[this.variant()],
      this.elevated() ? 'shadow-2xl shadow-primary/30' : 'shadow-xl shadow-black/40',
    ].join(' ');
  }
}
