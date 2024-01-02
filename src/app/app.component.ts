import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule, RouterLinkActive } from '@angular/router';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ThemeSwitcherComponent, RouterModule, RouterLinkActive, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLightTheme:boolean = false;
  themeSwitchCounter:number = 0;

  constructor(public router:Router) {
    this.updateTheme();
  }

  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
    this.updateTheme();
    this.themeSwitchCounter++;
  }
  updateTheme() {
    switch (this.themeSwitchCounter) { // ignore this
      case 10:
        alert('bro stop')
        break;
      case 20:
        alert('seriously')
        break;
      case 30:
        alert('stop it')
        break;
      case 40:
        alert('you\'re gonna break it')
        break;
      case 50:
        document.body.className = 'what'
        alert('great. you broke it.')
        return;
      case 60:
        alert('it\'s broken')
        return;
      case 70:
        alert('it\'s still broken')
        return;
      case 80:
        alert('it\'s no use man. it\'s broken')
        return;
      case 90:
        alert('you\'re still here?')
        return;
      case 100:
        alert('fine. you win. i\'ll fix it.')
        this.themeSwitchCounter = 0;
        break;
    } if (this.themeSwitchCounter > 50) return;


    document.body.className = this.isLightTheme ? 'light-theme' : 'dark-theme';
  }
}
