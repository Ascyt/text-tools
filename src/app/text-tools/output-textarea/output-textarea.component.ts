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

  copyButtonText: string = 'Copy';
  copiedTextAnimation: string[] = ['Copy', 'Copie', 'Copied', 'Copied!']

  constructor(public themeSwitcher: ThemeSwitcherService) {

  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.text).then(() => {
      console.log('Copying to clipboard was successful!');

      this.showCopiedToast = true;
      this.toCopiedText(1);

      setTimeout(() => {
        this.showCopiedToast = false;
        this.toCopiedTextReverse(this.copiedTextAnimation.length - 2);
      }, 2000);
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
  }

  toCopiedText(currentIndex: number) {
    this.copyButtonText = this.copiedTextAnimation[currentIndex];

    if (currentIndex < this.copiedTextAnimation.length - 1) {
      setTimeout(() => {
        this.toCopiedText(currentIndex + 1);
      }, 25);
    } else {
      this.copyButtonText = this.copiedTextAnimation[this.copiedTextAnimation.length - 1];
    }
  }

  toCopiedTextReverse(currentIndex: number) {
    this.copyButtonText = this.copiedTextAnimation[currentIndex];

    if (currentIndex > 0) {
      setTimeout(() => {
        this.toCopiedTextReverse(currentIndex - 1);
      }, 33);
    } else {
      this.copyButtonText = this.copiedTextAnimation[0];
    }
  }
}
