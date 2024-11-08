import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeSwitcherService } from '../theme-switcher/theme-switcher.service';
import { OutputTextareaComponent } from './output-textarea/output-textarea.component';
import { SHA256 } from 'crypto-js';
import { SavesService } from '../saves/saves.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-text-tools',
  standalone: true,
  imports: [FormsModule, NgbModule, CommonModule, OutputTextareaComponent],
  templateUrl: './text-tools.component.html',
  styleUrl: './text-tools.component.scss'
})
export class TextToolsComponent implements OnInit, OnDestroy {
  constructor(private themeSwitcher: ThemeSwitcherService, private savesService: SavesService) {
    
  }

  public get text(): string {
    return this.savesService.currentSave?.text || '';
  }
  public set text(value: string) {
    this.savesService.currentSave!.text = value;
    this.savesService.saveAll();
    this.textUpdated();
  }
  private saveIdChangeSubscription: Subscription|undefined;

  ngOnInit(): void {
    this.saveIdChangeSubscription = this.savesService.currentSaveId$.subscribe(id => {
      this.textUpdated();
    });
  }
  ngOnDestroy(): void {
    if (this.saveIdChangeSubscription !== undefined) {
      this.saveIdChangeSubscription.unsubscribe(); // Clean up the subscription
    }
  }

  showCopiedToast: boolean = false;

  collapseCases: boolean = true;
  collapseOther: boolean = true;

  textLength: number = 0;
  textWords: number = 0;
  textLines: number = 0;
  textParagraphs: number = 0;
  textSentences: number = 0;
  
  textReverse: string = '';
  textEscapeMarkdown: string = '';
  textSha256: string = '';

  textUppercase: string = '';
  textLowercase: string = '';
  textTitlecase: string = '';
  textSwapcase: string = '';
  textAlternatingcase: string = '';
  textMockcase: string = '';

  textDiscordMessagePagination: string = '';

  copyToClipboard(this: TextToolsComponent, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copying to clipboard was successful!');
      this.showCopiedToast = true;
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

    this.textSha256 = SHA256(this.text).toString();

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

    this.textDiscordMessagePagination = this.getDiscordMessagePagination(this.text);
  }

  getMarkdownEscape(text:string):string {
    const markdownSpecialCharacters:string[] = ['\\', '*', '_', '`', '[', ']', '(', ')', '#', '+', '-', '.', '!', ':', '|', '~', '<', '>'];

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

    output = `"${output}"`

    const emojis:string[] = ['💀']

    do {
      output += emojis[Math.floor(Math.random() * emojis.length)];
    } while (Math.random() < 0.75);

    return output;
  }
  
  getDiscordMessagePagination(text:string):string {
    const lines:string[] = text.trim().split('\n').map(line => line.trim());

    if (lines.length === 0) {
      return '';
    }

    let outputLines:string[] = [];

    for (let i = 0; i < lines.length; i++) {
      let paginationParts:string[] = [];

      // First message and left message
      if (i === 0) {
        paginationParts.push(`|←`);
        paginationParts.push(`←`);
      }
      else {
        paginationParts.push(`[|←](<${lines[0]}>)`);
        paginationParts.push(`[←](<${lines[i - 1]}>)`);
      }

      // Current message and count
      let currentPageIndexFormatted:string = `${i + 1}`.padStart(`${lines.length}`.length, '0');
      paginationParts.push(`\`${currentPageIndexFormatted}/${lines.length}\``);

      // Right message and last message
      if (i === lines.length - 1) {
        paginationParts.push(`→`);
        paginationParts.push(`→|`);
      }
      else {
        paginationParts.push(`[→](<${lines[i + 1]}>)`);
        paginationParts.push(`[→|](<${lines[lines.length - 1]})`);
      }

      outputLines.push(`-# **${paginationParts.join("  ")}**`);
    }

    return outputLines.join('\n');
  }
}
