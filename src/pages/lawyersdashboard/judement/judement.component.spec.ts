import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudementComponent } from './judement.component';

describe('JudementComponent', () => {
  let component: JudementComponent;
  let fixture: ComponentFixture<JudementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JudementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JudementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
