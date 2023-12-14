import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkRoLawyerComponent } from './talk-ro-lawyer.component';

describe('TalkRoLawyerComponent', () => {
  let component: TalkRoLawyerComponent;
  let fixture: ComponentFixture<TalkRoLawyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalkRoLawyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalkRoLawyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
