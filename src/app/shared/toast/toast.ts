import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { ToastService } from './toast-service';

@Component({
  selector: 'app-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fixed top-4 right-4 z-50 space-y-2 block',
  },
  template: `
    @let _vm = viewModel();

    @for (item of _vm.toastItems; track item.id) {
    <div [class]="item.classes">
      {{ item.message }}
      <button (click)="item.onDismiss()" class="ml-4 font-bold hover:scale-110 transition-transform">✕</button>
    </div>
    }
  `,
})
export class Toast {
  private readonly _toastService = inject(ToastService);

  protected readonly viewModel = computed(() => {
    const toasts = this._toastService.toasts();

    return {
      toastItems: toasts.map(toast => ({
        id: toast.id,
        message: toast.message,
        classes: this._toastClasses(toast.type),
        onDismiss: () => this._toastService.dismiss(toast.id),
      })),
    };
  });

  private _toastClasses(type: string): string {
    const base = 'px-6 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-[300px] transition-all animate-in slide-in-from-right fade-in duration-300';
    const variants = {
      success: 'bg-success text-white border-l-4 border-success-hover',
      error: 'bg-error text-white border-l-4 border-error-hover',
      info: 'bg-info text-white border-l-4 border-info',
    };
    return `${base} ${variants[type as keyof typeof variants]}`;
  }
}
