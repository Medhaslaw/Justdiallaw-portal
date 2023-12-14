import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArticalComponent } from './view-artical.component';

describe('ViewArticalComponent', () => {
  let component: ViewArticalComponent;
  let fixture: ComponentFixture<ViewArticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewArticalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewArticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
