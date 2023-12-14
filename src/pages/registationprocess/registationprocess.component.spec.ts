import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistationprocessComponent } from './registationprocess.component';

describe('RegistationprocessComponent', () => {
  let component: RegistationprocessComponent;
  let fixture: ComponentFixture<RegistationprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistationprocessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistationprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
