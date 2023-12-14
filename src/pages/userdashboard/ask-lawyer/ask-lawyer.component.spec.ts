import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskLawyerComponent } from './ask-lawyer.component';

describe('AskLawyerComponent', () => {
  let component: AskLawyerComponent;
  let fixture: ComponentFixture<AskLawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskLawyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
