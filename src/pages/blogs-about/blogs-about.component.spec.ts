import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsAboutComponent } from './blogs-about.component';

describe('BlogsAboutComponent', () => {
  let component: BlogsAboutComponent;
  let fixture: ComponentFixture<BlogsAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogsAboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
