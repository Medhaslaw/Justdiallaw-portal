import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTimelinesComponent } from './user-timelines.component';

describe('UserTimelinesComponent', () => {
  let component: UserTimelinesComponent;
  let fixture: ComponentFixture<UserTimelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTimelinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTimelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
