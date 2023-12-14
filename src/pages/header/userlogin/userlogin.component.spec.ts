import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UserregistationService } from 'src/services/userregistation.service';

import { UserloginComponent } from './userlogin.component';

describe('UserloginComponent', () => {
  let component: UserloginComponent;
  let fixture: ComponentFixture<UserloginComponent>;

  let authServiceSpy = jasmine.createSpyObj('UserregistationService', [' usrlog']);
  authServiceSpy.login.and.returnValue(of());


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserloginComponent ],
      imports: [FormsModule,ReactiveFormsModule],
      providers: [
        {
          provide: UserregistationService, useValue: authServiceSpy
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('Test A Form Group Element Count', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('#userLoginForm');
    const inputElement = formElement.querySelectorAll('input');
    expect(inputElement.length).toEqual(2);
  });


  it('should allow user to log in', () => {
    const formData = {
      "email": "something@somewhere.com",
      "password": "8938ndisn@din"
    };
    component.userLoginForm.setValue(formData);
    component.usrlog();

    expect(authServiceSpy.usrlog).toHaveBeenCalledWith(formData.email, formData.password);
  });


  it('should not allow user to log in', () => {
    const formData = {
      "email": "invalidemail",
      "password": "8938ndisn@din"
    };
    component.userLoginForm.setValue(formData);
    component.usrlog();

    expect(component.userLoginForm.invalid).toEqual(true);
    expect(authServiceSpy.usrlog).toHaveBeenCalledTimes(0);
  });


  it('email field validity', () => {
    let errors:any = {};
    let email = component.userLoginForm.controls['email'];
     errors = email.errors || {};
    expect(errors['required']).toBeTruthy(); (1)
  });


  it('should require valid email', () => {
    component.userLoginForm.setValue({
      // "name": "", 
      "email": "invalidemail", 
      "password": ""
    });

    expect(component.userLoginForm.valid).toEqual(false);
  });


  it('should be valid if form value is valid', () => {
    component.userLoginForm.setValue({
      // "name": "Bobby", 
      "email": "bobby@bobby.com", 
      "password": "Bobby@123"
    });

    expect(component.userLoginForm.valid).toEqual(true);
  });


});
