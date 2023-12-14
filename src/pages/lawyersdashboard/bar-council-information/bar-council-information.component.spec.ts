import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCouncilInformationComponent } from './bar-council-information.component';

describe('BarCouncilInformationComponent', () => {
  let component: BarCouncilInformationComponent;
  let fixture: ComponentFixture<BarCouncilInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarCouncilInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarCouncilInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
