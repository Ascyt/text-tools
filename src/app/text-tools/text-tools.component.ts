import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-text-tools',
  standalone: true,
  imports: [FormsModule, NgbModule],
  templateUrl: './text-tools.component.html',
  styleUrl: './text-tools.component.scss'
})
export class TextToolsComponent {
  text: string = '';

  collapseCases: boolean = true;

  textLength: number = 0;
  textWords: number = 0;
  textLines: number = 0;
  textParagraphs: number = 0;
  textSentences: number = 0;
  
  textReverse: string = '';
  textEscapeMarkdown: string = '';

  textUppercase: string = '';
  textLowercase: string = '';
  textTitlecase: string = '';
  textSwapcase: string = '';
  textAlternatingcase: string = '';
  textMockcase: string = '';

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(function() {
      console.log('Copying to clipboard was successful!');
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
  }

  textUpdated() {
    this.textLength = this.text.length;
    this.textWords = this.text === '' ? 0 : this.text.trim().split(/[ \n]+/).length;
    this.textLines = this.text === '' ? 0 : this.text.split('\n').length;
    this.textParagraphs = this.text === '' ? 0 : (this.text.trim().split(/(\r?\n){2,}/).length + 1) / 2;
    this.textSentences = this.text.split(/[.,!?]+/).length - 1;
    
    this.textReverse = this.text
      .split('')
      .reverse()
      .join('');

    this.textEscapeMarkdown = this.getMarkdownEscape(this.text);

    this.textUppercase = this.text.toLocaleUpperCase();
    this.textLowercase = this.text.toLocaleLowerCase();
    this.textTitlecase = this.text.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toLocaleUpperCase() + txt.substr(1).toLocaleLowerCase();
    });
    this.textSwapcase = this.text.replace(/\S/g, function(txt) {
      return txt === txt.toLocaleUpperCase() ? txt.toLocaleLowerCase() : txt.toLocaleUpperCase();
    });
    this.textAlternatingcase = this.text.replace(/\S/g, function(txt, i) {
      return i % 2 ? txt.toLocaleLowerCase() : txt.toLocaleUpperCase();
    });
    this.textMockcase = this.getTextMockcase(this.text);
  }

  getMarkdownEscape(text:string):string {
    const markdownSpecialCharacters:string[] = ['\\', '*', '_', '`', '[', ']', '(', ')', '#', '+', '-', '.', '!'];

    for (let i = 0; i < markdownSpecialCharacters.length; i++) {
      text = text.replace(new RegExp('\\' + markdownSpecialCharacters[i], 'g'), '\\' + markdownSpecialCharacters[i]);
    }

    return text;
  }

  getTextMockcase(text:string):string {
    const alwaysLowerCase:string = 'i';
    const alwaysUpperCase:string = 'l';

    let output:string = '';
    let upperCase:boolean = true;
    for (let i = 0; i < text.length; i++) {
      if (alwaysLowerCase.includes(text[i].toLowerCase())) {
        output += text[i].toLowerCase();
        upperCase = false;
        continue;
      } 
      if (alwaysUpperCase.includes(text[i].toLowerCase())) {
        output += text[i].toUpperCase();
        upperCase = true;
        continue;
      } 

      if (text[i].match(/[a-z]/i)) {
        upperCase = !upperCase;
        output += upperCase ? text[i].toLocaleUpperCase() : text[i].toLocaleLowerCase();
        continue;
      } 

      if (text[i] === ' ')
        upperCase = true;

      output += text[i];
    }

    return output;
  }
}
