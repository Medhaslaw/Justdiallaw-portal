import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLinkPopupComponent } from './payment-link-popup.component';

describe('PaymentLinkPopupComponent', () => {
  let component: PaymentLinkPopupComponent;
  let fixture: ComponentFixture<PaymentLinkPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentLinkPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentLinkPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
