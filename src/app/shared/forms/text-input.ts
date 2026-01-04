import { Component, input, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInput),
      multi: true,
    },
  ],
  host: {
    class: 'block mb-2',
  },
  template: `
    @let isEmpty = !value || value.trim() === '';
    @let isValidEmail = type() === 'email' ? emailRegex.test(value) : true;
    @let isValidPhone = type() === 'tel' ? phoneRegex.test(value) : true;
    @let hasError = touched() && ((required() && isEmpty) || (type() === 'email' && !isEmpty && !isValidEmail) || (type() === 'tel' && !isEmpty && !isValidPhone));

    <fieldset>
      <label [for]="id()" class="block text-sm font-semibold text-text/90 mb-2">
        {{ label() }}
        @if (required()) {
        <span class="text-red ml-0.5">*</span>
        }
      </label>
      <input
        [id]="id()"
        [type]="type()"
        [placeholder]="placeholder()"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onBlur()"
        [disabled]="disabled"
        [class.border-red-600]="hasError"
        class="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      />
      @if (hasError) {
        <div class="mt-2 px-2 bg-red-50 border-l-4 border-red-600 rounded-r-md" role="alert">
          @if (required() && isEmpty) {
            <p class="text-sm font-semibold text-red-800 flex items-center gap-2">
              <span class="text-lg">⚠️</span>
              <span>Ce champ est obligatoire</span>
            </p>
          } @else if (type() === 'email' && !isValidEmail) {
            <p class="text-sm font-semibold text-red-800 flex items-center gap-2">
              <span class="text-lg">⚠️</span>
              <span>Format d'email invalide</span>
            </p>
          } @else if (type() === 'tel' && !isValidPhone) {
            <p class="text-sm font-semibold text-red-800 flex items-center gap-2">
              <span class="text-lg">⚠️</span>
              <span>{{ patternError() || 'Format invalide (ex: 06 12 34 56 78)' }}</span>
            </p>
          }
        </div>
      }
    </fieldset>
  `,
})
export class TextInput implements ControlValueAccessor {
  readonly label = input.required<string>();
  readonly type = input<string>('text');
  readonly placeholder = input<string>('');
  readonly required = input<boolean>(false);
  readonly patternError = input<string>('');
  readonly id = input<string>(crypto.randomUUID());

  readonly touched = signal(false);

  protected readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  protected readonly phoneRegex = /^0[1-9](\s?\d{2}){4}$/;

  value = '';
  disabled = false;
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  onBlur(): void {
    this.touched.set(true);
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value ?? '';
    this.touched.set(false);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }
}
