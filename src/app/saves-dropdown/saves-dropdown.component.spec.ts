import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavesDropdownComponent } from './saves-dropdown.component';

describe('SavesDropdownComponent', () => {
  let component: SavesDropdownComponent;
  let fixture: ComponentFixture<SavesDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavesDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavesDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
