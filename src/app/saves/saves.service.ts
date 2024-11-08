import { Injectable } from '@angular/core';
import { Save } from './save';

@Injectable({
  providedIn: 'root'
})
export class SavesService {
  public saves: Save[] = [];
  private _currentSaveId: number = 0;
  public get currentSaveId() {
    return this._currentSaveId;
  }
  public set currentSaveId(value: number) {
    this._currentSaveId = value;
  }

  public get currentSave(): Save|undefined {
    return this.saves.find(save => save.id === this.currentSaveId);
  }

  constructor() {
    this.loadSaves();
    
    if (this.saves.length === 0) {
      this.saves = [
        {
          id: 0,
          name: 'Save 1',
          text: '',
          date: new Date()
        }
    ];
    }
  }

  loadSaves() {
    this.saves = JSON.parse(localStorage.getItem('saves') || '[]');
  }

  saveSaves() {
    localStorage.setItem('saves', JSON.stringify(this.saves));
  }
}
