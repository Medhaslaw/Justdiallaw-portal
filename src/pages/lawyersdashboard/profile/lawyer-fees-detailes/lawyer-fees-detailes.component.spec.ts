import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerFeesDetailesComponent } from './lawyer-fees-detailes.component';

describe('LawyerFeesDetailesComponent', () => {
  let component: LawyerFeesDetailesComponent;
  let fixture: ComponentFixture<LawyerFeesDetailesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawyerFeesDetailesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawyerFeesDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
