import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyersSignupComponent } from './lawyers-signup.component';

describe('LawyersSignupComponent', () => {
  let component: LawyersSignupComponent;
  let fixture: ComponentFixture<LawyersSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LawyersSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawyersSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
