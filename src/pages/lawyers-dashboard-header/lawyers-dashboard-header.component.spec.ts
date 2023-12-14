import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyersDashboardHeaderComponent } from './lawyers-dashboard-header.component';

describe('LawyersDashboardHeaderComponent', () => {
  let component: LawyersDashboardHeaderComponent;
  let fixture: ComponentFixture<LawyersDashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawyersDashboardHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawyersDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
