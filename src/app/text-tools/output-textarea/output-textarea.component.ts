import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';

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

  copyToClipboard() {
    navigator.clipboard.writeText(this.text).then(() => {
      console.log('Copying to clipboard was successful!');
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
  }
}
