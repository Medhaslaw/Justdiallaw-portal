import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotsBlockingModelComponent } from './slots-blocking-model.component';

describe('SlotsBlockingModelComponent', () => {
  let component: SlotsBlockingModelComponent;
  let fixture: ComponentFixture<SlotsBlockingModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotsBlockingModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotsBlockingModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
