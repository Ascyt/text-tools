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

  constructor() {
    //this.saves = JSON.parse(localStorage.getItem('saves') || '[]');
    this.saves = [
      {
        id: 0,
        name: 'Save 1',
        text: 'This is the first save.',
        date: new Date()
      },
      {
        id: 1,
        name: 'Save 2',
        text: 'This is the second save.',
        date: new Date()
      },
      {
        id: 2,
        name: 'Save 3',
        text: 'This is the third save.',
        date: new Date()
      }
    ];
  }
}
