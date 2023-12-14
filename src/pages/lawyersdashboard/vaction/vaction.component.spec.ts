import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VactionComponent } from './vaction.component';

describe('VactionComponent', () => {
  let component: VactionComponent;
  let fixture: ComponentFixture<VactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
