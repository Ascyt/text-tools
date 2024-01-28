import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { ThemeSwitcherService } from '../../theme-switcher/theme-switcher.service';

@Component({
  selector: 'app-output-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './output-textarea.component.html',
  styleUrl: './output-textarea.component.scss'
})
export class OutputTextareaComponent {
  @Input() text: string = '';
  @Input() title: string = '';
  @Input() description: string|undefined = undefined;
  @Input() hiddenText: string|undefined = undefined;

  showCopiedToast: boolean = false;

  constructor(public themeSwitcher: ThemeSwitcherService) {

  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.text).then(() => {
      console.log('Copying to clipboard was successful!');

      this.showCopiedToast = true;
      setTimeout(() => {
        this.showCopiedToast = false;
      }, 1000);
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
  }
}
