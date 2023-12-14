import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerbriefComponent } from './lawyerbrief.component';

describe('LawyerbriefComponent', () => {
  let component: LawyerbriefComponent;
  let fixture: ComponentFixture<LawyerbriefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawyerbriefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawyerbriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
