import { Component, ElementRef, ViewChild } from '@angular/core';
import { SavesService } from '../saves/saves.service';
import { Save } from '../saves/save';

@Component({
  selector: 'app-saves-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './saves-dropdown.component.html',
  styleUrl: './saves-dropdown.component.scss'
})
export class SavesDropdownComponent {
  @ViewChild('saveNameInput') saveNameInput: ElementRef | undefined;

  public get deleteDisabled(): boolean {
    return this.savesService.saves.length <= 1;
  }

  public currentSaveName:string = "";

  public constructor(public savesService:SavesService) {}

  
  onEditSaveNameStart():void {
    this.currentSaveName = this.savesService.currentSave!.name;

    // run in next frame
    setTimeout(() => {
      this.saveNameInput?.nativeElement.focus();
    });
  }

  onEditSaveNameSave():void {
    this.savesService.currentSave!.name = this.currentSaveName;
  }

  onEditSaveNameCancel():void {
    this.currentSaveName = this.savesService.currentSave!.name;
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
  }

  onCreateSave():void {
    this.savesService.saves.push({
      id: this.savesService.saves.length,
      name: "New Save",
      text: "",
      date: new Date()
    });
    this.savesService.currentSaveId = this.savesService.saves.length - 1;
  }
}
