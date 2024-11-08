import { Component, ElementRef, ViewChild } from '@angular/core';
import { SavesService } from '../saves/saves.service';
import { Save } from '../saves/save';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-saves-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule],
  templateUrl: './saves-dropdown.component.html',
  styleUrl: './saves-dropdown.component.scss'
})
export class SavesDropdownComponent {
  @ViewChild('saveNameInput') saveNameInput: ElementRef | undefined;

  public get deleteDisabled(): boolean {
    return this.savesService.saves.length <= 1;
  }

  public currentSaveName:string = "";
  public isEditingSaveName:boolean = false;

  public constructor(public savesService:SavesService) {}
  
  onEditSaveNameStart():void {
    this.currentSaveName = this.savesService.currentSave!.name;
    this.isEditingSaveName = true;

    // run in next frame
    setTimeout(() => {
      this.saveNameInput?.nativeElement.focus();
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
    this.savesService.currentSaveId = save.id;
    this.savesService.saveAll();
  }

  onCreateSave():void {
    this.savesService.saves.push({
      id: this.savesService.saves.length,
      name: "New Save",
      text: "",
      date: new Date()
    });
    this.savesService.currentSaveId = this.savesService.saves.length - 1;
    this.savesService.saveAll();
  }

  onDeleteSave():void {
    if (this.savesService.saves.length <= 1) {
      return;
    }

    this.savesService.saves.splice(this.savesService.currentSaveId, 1);

    this.savesService.currentSaveId--;
    if (this.savesService.currentSaveId < 0) {
      this.savesService.currentSaveId = 0;
    }

    this.savesService.saveAll();
  }
}
