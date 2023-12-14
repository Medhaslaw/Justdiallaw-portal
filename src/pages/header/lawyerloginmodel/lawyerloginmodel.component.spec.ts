import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerloginmodelComponent } from './lawyerloginmodel.component';

describe('LawyerloginmodelComponent', () => {
  let component: LawyerloginmodelComponent;
  let fixture: ComponentFixture<LawyerloginmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawyerloginmodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawyerloginmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
