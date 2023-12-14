import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewtopicComponent } from './add-newtopic.component';

describe('AddNewtopicComponent', () => {
  let component: AddNewtopicComponent;
  let fixture: ComponentFixture<AddNewtopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewtopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewtopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
