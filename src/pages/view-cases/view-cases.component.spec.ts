import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCasesComponent } from './view-cases.component';

describe('ViewCasesComponent', () => {
  let component: ViewCasesComponent;
  let fixture: ComponentFixture<ViewCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
