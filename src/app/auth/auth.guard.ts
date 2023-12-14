import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LawyeregService } from 'src/services/lawyereg.service';
import { UserregistationService } from 'src/services/userregistation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public lawyerreg: LawyeregService, public userreg: UserregistationService, public router: Router){}
  canActivate() {
    if(localStorage.getItem('lawyer-token')){
      return true;
    }else if(localStorage.getItem('user-token')){
      return true;
    }else{
      this.router.navigate(['/home'])
      return false
    }
    
   
  }
  
}
