import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
  imports: [NgbModule, FormsModule]
})
export class ThemeSwitcherComponent {
  @Output() themeChanged = new EventEmitter<boolean>();

  toggleTheme() {
    this.themeChanged.emit();
  }
}
