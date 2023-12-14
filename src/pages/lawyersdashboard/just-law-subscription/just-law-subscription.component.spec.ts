import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustLawSubscriptionComponent } from './just-law-subscription.component';

describe('JustLawSubscriptionComponent', () => {
  let component: JustLawSubscriptionComponent;
  let fixture: ComponentFixture<JustLawSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JustLawSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JustLawSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
