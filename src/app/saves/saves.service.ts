import { Injectable } from '@angular/core';
import { Save } from './save';
import { BehaviorSubject, Observable } from 'rxjs';

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
    this.saveIdSubject.next(value); // Notify subscribers of the change
  }

  public get currentSave(): Save|undefined {
    return this.saves.find(save => save.id === this.currentSaveId);
  }  
  private saveIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this._currentSaveId);

  public get currentSaveId$(): Observable<number> {
    return this.saveIdSubject.asObservable();
  }

  constructor() {
    this.loadAll();
    
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

  loadAll() {
    this.saves = JSON.parse(localStorage.getItem('saves') || '[]');
    this.currentSaveId = Number(JSON.parse(localStorage.getItem('currentSaveId') || '0'));
  }

  saveAll() {
    localStorage.setItem('saves', JSON.stringify(this.saves));
    localStorage.setItem('currentSaveId', JSON.stringify(this.currentSaveId));
  }
}
