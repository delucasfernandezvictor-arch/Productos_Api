import { Injectable, signal } from '@angular/core';

/** Gestiona el modo oscuro: lo recuerda en localStorage y respeta la preferencia del sistema. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly KEY = 'dam2-theme';
  readonly dark = signal(false);

  constructor() {
    let saved: string | null = null;
    try { saved = localStorage.getItem(this.KEY); } catch { /* sin acceso a storage */ }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.apply(saved ? saved === 'dark' : prefersDark);
  }

  toggle(): void {
    this.apply(!this.dark());
    try { localStorage.setItem(this.KEY, this.dark() ? 'dark' : 'light'); } catch { /* ignorar */ }
  }

  private apply(dark: boolean): void {
    this.dark.set(dark);
    document.documentElement.classList.toggle('dark', dark);
  }
}
