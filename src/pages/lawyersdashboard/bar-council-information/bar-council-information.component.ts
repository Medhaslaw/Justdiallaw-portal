import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LawyeregService } from 'src/services/lawyereg.service';

@Component({
  selector: 'app-bar-council-information',
  templateUrl: './bar-council-information.component.html',
  styleUrls: ['./bar-council-information.component.scss']
})
export class BarCouncilInformationComponent implements OnInit {
  fileName:any;
  files:any;
  submitted:any
  barCouncilForm!: FormGroup;

  constructor(public formBuilder: FormBuilder, public lawyerService: LawyeregService, 
    public toastr: ToastrService,
    public router: Router) { }

  ngOnInit(): void {
    this.barCouncilForm = this.formBuilder.group({
      council_id:['', Validators.required],
      state_council_id:['', Validators.required],
      bar_association:['', Validators.required],
      bar_council_id:['',]
    })
    this.getBarCouncil()
  }

  onFileChanged(event: any){
    this.files = event.target.files[0];
   this.fileName = event.target.files[0].name
  }  

  cancelBtn(){
    this.router.navigate(['/lawyer-jdl/profile'])

    // if(this.barCouncilInfo.bar_council_certificate_or_id_card && this.barCouncilInfo.name_of_bar_association ){
      
    // } else{
    //   this.toastr.error('Please Fill The All Inputs','Error!')
    // }

  }

  barCouncilInfo:any;
  getBarCouncil(){
    this.lawyerService.getBarCouncilInfo().subscribe((res:any)=>{
      if(res.length > 0){
        this.barCouncilInfo = res[0];
        this.barCouncilForm = this.formBuilder.group({
          council_id:[this.barCouncilInfo.bar_council_registration_number, Validators.required],
          state_council_id:[this.barCouncilInfo.state_bar_council, Validators.required],
          bar_association:[this.barCouncilInfo.name_of_bar_association, Validators.required],
          bar_council_id:[this.barCouncilInfo.bar_council_certificate_or_id_card,]
        })
        this.fileName = this.barCouncilInfo.bar_council_cetificate_url
      }
    })
  }


  saveCouncilInfo(){
    if(this.barCouncilForm.valid){
      let formData = new FormData()
      formData.append('name_of_bar_association', this.barCouncilForm.value.bar_association)
      formData.append('state_bar_council', this.barCouncilForm.value.state_council_id)
      formData.append('bar_council_registration_number', this.barCouncilForm.value.council_id)

      if(this.files){
        formData.append('bar_council_certificate_or_id_card', this.files)
      }

      if(this.barCouncilInfo){
        this.lawyerService.updateBarCouncilInfo(formData, 'BarcouncilInfomationDetails').subscribe((res)=>{
          if(res.id){
            this.toastr.success('Bar Council Information updated successfully!', 'Success!');

            this.router.navigate(['/lawyer-jdl/profile'])
          }
        })
      } 
      else if(this.barCouncilForm.valid && this.files){
        this.lawyerService.saveBarCouncilInfo(formData, 'BarcouncilInfomationList').subscribe((res)=>{
          if(res.id){
            this.toastr.success('Bar Council Information added successfully!', 'Success!');

            this.router.navigate(['/lawyer-jdl/profile'])
          }
        })
      } else {
        this.toastr.error('Updated the  Bar Council Information!', 'Error!');
      }
    } else{
      this.toastr.error('Updated the  Bar Council Information!', 'Error!');
    }
  }


}
