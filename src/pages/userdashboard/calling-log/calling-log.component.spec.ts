import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallingLogComponent } from './calling-log.component';

describe('CallingLogComponent', () => {
  let component: CallingLogComponent;
  let fixture: ComponentFixture<CallingLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallingLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallingLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
