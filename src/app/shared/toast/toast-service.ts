import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toastsSignal = signal<Toast[]>([]);
  readonly toasts = this._toastsSignal.asReadonly();

  show(message: string, type: Toast['type'] = 'info', duration = 3000): void {
    const toast: Toast = {
      id: crypto.randomUUID(),
      message,
      type,
      duration,
    };

    this._toastsSignal.update((toasts) => [...toasts, toast]);

    if (duration > 0) {
      setTimeout(() => this.dismiss(toast.id), duration);
    }
  }

  dismiss(id: string): void {
    this._toastsSignal.update((toasts) => toasts.filter((t) => t.id !== id));
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error', 5000);
  }
}
