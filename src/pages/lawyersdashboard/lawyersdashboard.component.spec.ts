import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyersdashboardComponent } from './lawyersdashboard.component';

describe('LawyersdashboardComponent', () => {
  let component: LawyersdashboardComponent;
  let fixture: ComponentFixture<LawyersdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawyersdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawyersdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
