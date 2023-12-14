import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { LeadData } from 'src/pages/components/lawyer-info/models/lead.interface';
import { ViewCasesComponent } from 'src/pages/view-cases/view-cases.component';
import { LawyeregService } from 'src/services/lawyereg.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  userDetails:any;

  page = 1;  

  myLeadList:LeadData[]=[];

  displayedColumns: string[] = ['client', 'phone', 'date', 'slot', 'action'];
  dataSource!: MatTableDataSource<LeadData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public lawyerService: LawyeregService ,
    private toastr: ToastrService,public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getProfileDetails()
    this.getLeads()
    this.getBarCouncil()
  }

  barCouncilInfo:any;

  getBarCouncil(){
    this.lawyerService.getBarCouncilInfo().subscribe((res:any)=>{
      if(res.length > 0){
        this.barCouncilInfo = res[0];
       
      }
    })
  }
  
  getProfileDetails(){
    this.lawyerService.getProfileDetails().subscribe(res=>{
      if(res.length > 0){
        this.userDetails=res[0]
      }
    })
      }

      getLeads(){
        this.lawyerService.getLeads().subscribe((res:any)=>{
          if(res.length > 0){
            this.myLeadList = res;
            this.dataSource = new MatTableDataSource(this.myLeadList)
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        })
      }

      lawyerAccepted(accObj:any){
        let reqData = {
          accepts_or_rejects:'accept',
          appointment_id: accObj.id
        }
       
        this.lawyerService.appoibtmentStatus(reqData).subscribe((res:any) =>{
          if(res.success){
            this.getLeads()
            this.toastr.info('Case Accepted!', 'Accepted!');
          }
        })
      }


      lawyerReject(rejObj:any){
        let reqData ={
          accepts_or_rejects:'reject',
          appointment_id: rejObj.id
        }

        this.lawyerService.appoibtmentStatus(reqData).subscribe((res:any) =>{
          if(res.success === false){
            this.getLeads()
            this.toastr.info('Case Rejected!', 'Rejected!');
          }
         
        })

      }

      openDialog(element:any){
        const diagolref = this.dialog.open(ViewCasesComponent,{
          panelClass: 'CommentModal',
          data: element,
          disableClose: true,
        })
        diagolref.afterClosed().subscribe(res =>{
          
        })
      }

}
