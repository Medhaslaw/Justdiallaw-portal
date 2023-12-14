import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileinformationComponent } from './profileinformation.component';

describe('ProfileinformationComponent', () => {
  let component: ProfileinformationComponent;
  let fixture: ComponentFixture<ProfileinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileinformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
