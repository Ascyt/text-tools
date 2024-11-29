import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SavesService } from '../saves/saves.service';
import { Save } from '../saves/save';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { max } from 'rxjs';

@Component({
  selector: 'app-saves-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule],
  templateUrl: './saves-dropdown.component.html',
  styleUrl: './saves-dropdown.component.scss'
})
export class SavesDropdownComponent {
  @ViewChild('saveNameInput') saveNameInput: ElementRef | undefined;
  @ViewChild('dropdown') dropdown: NgbDropdown | undefined;

  public get deleteDisabled(): boolean {
    return this.savesService.saves.length <= 1;
  }

  public currentSaveName:string = "";
  public isEditingSaveName:boolean = false;
  private dropdownMouseDown:boolean = false;
  private dropdownMouseLeave:boolean = false;

  private currentHoverButton:EventTarget|undefined = undefined;

  public constructor(public savesService:SavesService) {}

  onDropdownMouseDown(event:MouseEvent):void {
    this.dropdownMouseDown = true;
  }
  onDropdownMouseUp(event:MouseEvent):void {
  }
  @HostListener('document:mouseup', ['$event'])
  onMouseDown(event:MouseEvent):void {
    if (this.dropdownMouseLeave && this.currentHoverButton !== undefined) {
      (this.currentHoverButton as HTMLElement).click();
    }

    if (this.dropdownMouseLeave) {
      this.dropdown?.close();
    }
    this.dropdownMouseDown = false;
  }
  onDropdownMouseLeave(event:MouseEvent):void {
    this.dropdownMouseLeave = true;

    if (this.dropdownMouseDown) {
      this.dropdown?.open();
    }
  }
  onDropdownMouseEnter(event:MouseEvent):void {
    this.dropdownMouseLeave = false;
  }

  onElementMouseEnter(event:MouseEvent):void {
    this.currentHoverButton = event.target ?? undefined;
  }
  onElementMouseLeave(event:MouseEvent):void {
    if (this.currentHoverButton === event.target) {
      this.currentHoverButton = undefined;
    }
  }
  
  onEditSaveNameStart():void {
    this.currentSaveName = this.savesService.currentSave!.name;
    this.isEditingSaveName = true;

    // run in next frame
    setTimeout(() => {
      this.saveNameInput?.nativeElement.focus();
      this.saveNameInput?.nativeElement.setSelectionRange(0, this.currentSaveName.length);
    });
  }

  onEditSaveNameSave():void {
    this.savesService.currentSave!.name = this.currentSaveName;
    this.savesService.saveAll();

    this.isEditingSaveName = false;
  }

  onEditSaveNameCancel():void {
    this.currentSaveName = this.savesService.currentSave!.name;
    this.savesService.saveAll();
    this.isEditingSaveName = false;
  }

  onEnterKeydown():void {
    // run in next frame
    setTimeout(() => {
      this.onEditSaveNameSave();
    });
  }
  onEscapeKeydown():void {
    // run in next frame
    setTimeout(() => {
      this.onEditSaveNameCancel();
    });
  }

  onSelectSave(save:Save):void {
    if (this.isEditingSaveName)
      this.onEditSaveNameCancel();

    this.savesService.currentSaveId = save.id;
    this.savesService.saveAll();
  }

  onCreateSave():void {
    if (this.isEditingSaveName)
      this.onEditSaveNameCancel();

    const newId = this.savesService.saves.map(s => s.id).reduce((a, b) => Math.max(a, b), 0) + 1;

    let name:string = 'New Save';
    let nameIndex:number = 1;
    while (this.savesService.saves.some(s => s.name === name)) {
      name = `New Save ${nameIndex + 1}`;
      nameIndex++;
    }

    this.savesService.saves.push({
      id: newId,
      name: name,
      text: "",
      date: new Date()
    });
    this.savesService.currentSaveId = newId;
    this.savesService.saveAll();
  }

  onDeleteSave():void {
    if (this.isEditingSaveName)
      this.onEditSaveNameCancel();

    if (this.savesService.saves.length <= 1) {
      return;
    }

    this.savesService.saves.splice(this.savesService.currentSaveId, 1);

    this.savesService.currentSaveId = this.savesService.saves[this.savesService.saves.length - 1].id;

    this.savesService.saveAll();
  }
}
