import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntellectualPropertyAssignmentAgreementComponent } from './intellectual-property-assignment-agreement.component';

describe('IntellectualPropertyAssignmentAgreementComponent', () => {
  let component: IntellectualPropertyAssignmentAgreementComponent;
  let fixture: ComponentFixture<IntellectualPropertyAssignmentAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntellectualPropertyAssignmentAgreementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntellectualPropertyAssignmentAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
