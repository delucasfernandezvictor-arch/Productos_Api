import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button type="button" class="toggle" (click)="theme.toggle()"
            [attr.aria-pressed]="theme.dark()"
            [attr.aria-label]="theme.dark() ? 'Activar modo claro' : 'Activar modo oscuro'">
      @if (theme.dark()) {
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
        </svg>
      } @else {
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>
        </svg>
      }
      <span class="label">{{ theme.dark() ? 'Modo claro' : 'Modo oscuro' }}</span>
    </button>
  `,
  styles: [`
    .toggle {
      display: inline-flex; align-items: center; gap: .5rem;
      height: 2.5rem; padding: 0 1rem; border-radius: 999px; cursor: pointer;
      border: 1.5px solid var(--c-line); background: var(--c-surface); color: var(--c-ink);
      font: 600 .85rem/1 var(--f-body);
    }
    .toggle:hover { border-color: var(--c-ink-soft); }
    @media (max-width: 30rem) { .label { display: none; } .toggle { padding: 0 .75rem; } }
  `]
})
export class ThemeToggleComponent {
  readonly theme = inject(ThemeService);
}
