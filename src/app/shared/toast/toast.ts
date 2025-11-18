import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from './toast-service';

@Component({
  selector: 'app-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-2">
      @for (toast of toastService.toasts(); track toast.id) {
      <div [class]="getToastClasses(toast.type)" [@slideIn]>
        {{ toast.message }}
        <button (click)="toastService.dismiss(toast.id)" class="ml-4 font-bold">✕</button>
      </div>
      }
    </div>
  `,
})
export class Toast {
  toastService = inject(ToastService);

  getToastClasses(type: string): string {
    const base = 'px-6 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-[300px]';
    const variants = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      info: 'bg-blue-500 text-white',
    };
    return `${base} ${variants[type as keyof typeof variants]}`;
  }
}
