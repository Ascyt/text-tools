import { Injectable } from '@angular/core';
import { Save } from './save';

@Injectable({
  providedIn: 'root'
})
export class SavesService {
  public saves: Save[] = [];
  currentSaveId: number = 0;
  public get currentSave(): Save|undefined {
    return this.saves.find(save => save.id === this.currentSaveId);
  }

  constructor() { }
}
