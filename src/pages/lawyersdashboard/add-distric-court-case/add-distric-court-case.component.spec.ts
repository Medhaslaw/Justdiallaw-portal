import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDistricCourtCaseComponent } from './add-distric-court-case.component';

describe('AddDistricCourtCaseComponent', () => {
  let component: AddDistricCourtCaseComponent;
  let fixture: ComponentFixture<AddDistricCourtCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDistricCourtCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDistricCourtCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
