import { Component, input, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select-input',
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInput),
      multi: true,
    },
  ],
  host: {
    class: 'block mb-5',
  },
  template: `
    @let isEmpty = !value || value === '';
    @let hasRequiredError = touched() && required() && isEmpty;
    @let hasCustomError = customError() && customError() !== '';
    @let hasAnyError = hasRequiredError || hasCustomError;

    <fieldset>
      <label [for]="id()" class="block text-sm font-semibold text-text/90 mb-2">
        {{ label() }}
        @if (required()) {
        <span class="text-red ml-0.5">*</span>
        }
      </label>
      <select
        [id]="id()"
        [value]="value"
        (change)="onSelectChange($event)"
        (blur)="onBlur()"
        [disabled]="disabled"
        [class.border-red-600]="hasAnyError"
        class="w-full px-4 py-3 bg-background border border-primary/30 rounded-lg text-text placeholder-text/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        @if (placeholder()) {
        <option value="">{{ placeholder() }}</option>
        }
        @for (option of options(); track option.value) {
        <option [value]="option.value">{{ option.label }}</option>
        }
      </select>
      @if (hasRequiredError) {
        <div class="mt-2 px-2 bg-red-50 border-l-4 border-red-600 rounded-r-md" role="alert">
          <p class="text-sm font-semibold text-red-800 flex items-center gap-2">
            <span class="text-lg">⚠️</span>
            <span>Ce champ est obligatoire</span>
          </p>
        </div>
      }
      @if (hasCustomError) {
        <div class="mt-2 px-2 bg-red-50 border-l-4 border-red-600 rounded-r-md" role="alert">
          <p class="text-sm font-semibold text-red-800 flex items-center gap-2">
            <span class="text-lg">⚠️</span>
            <span>{{ customError() }}</span>
          </p>
        </div>
      }
    </fieldset>
  `,
})
export class SelectInput implements ControlValueAccessor {
  readonly label = input.required<string>();
  readonly options = input.required<SelectOption[]>();
  readonly placeholder = input<string>('');
  readonly required = input<boolean>(false);
  readonly customError = input<string | null>(null);
  readonly id = input<string>(crypto.randomUUID());

  readonly touched = signal(false);

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

  onSelectChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.value = value;
    this.onChange(value);
  }
}
