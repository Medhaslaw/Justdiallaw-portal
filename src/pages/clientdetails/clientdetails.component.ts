import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientdetails',
  templateUrl: './clientdetails.component.html',
  styleUrls: ['./clientdetails.component.scss']
})
export class ClientdetailsComponent implements OnInit {

  clientForm!:FormGroup ;
  
  
  constructor(private fb:FormBuilder, private router: Router,) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      fname: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9_-]{4,15}$")]],
      lname:['', [Validators.required, Validators.pattern("^[A-Za-z0-9_-]{4,15}$")]],
      email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phonenumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      zipcode:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")]],
      message:['', [Validators.required, Validators.pattern("^[A-Za-z0-9_-]{20,150}$")]],
    }) 

    window.onscroll = function () { myFunction() };

    let header: any = document.getElementById("myHeader");
    let sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
  }
  save(){
    console.log(this.clientForm.value)
    this.router.navigate(['/appointment_confirmed'])
  }

}
