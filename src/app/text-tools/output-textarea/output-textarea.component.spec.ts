import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputTextareaComponent } from './output-textarea.component';

describe('OutputTextareaComponent', () => {
  let component: OutputTextareaComponent;
  let fixture: ComponentFixture<OutputTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputTextareaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutputTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
