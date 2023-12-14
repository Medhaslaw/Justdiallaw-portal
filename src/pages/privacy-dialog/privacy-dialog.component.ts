import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-privacy-dialog',
  templateUrl: './privacy-dialog.component.html',
  styleUrls: ['./privacy-dialog.component.scss']
})
export class PrivacyDialogComponent implements OnInit {

  isTermsAccepted:boolean;

  constructor(  public dialogRef: MatDialogRef<PrivacyDialogComponent>,) {
    this.isTermsAccepted = sessionStorage.getItem('termsAccepted') === 'true';
   }

  ngOnInit(): void {
   
  }

  cloceDialog(){
    this.dialogRef.close()
  }

  acceptTerms(): void {
    // Store acceptance status in session storage
    sessionStorage.setItem('termsAccepted', 'true');
    this.closePopup();
    this.dialogRef.close()
  }

  closePopup(): void {
    // Logic to close the popup (e.g., set a flag to hide the component)
    this.dialogRef.close()
  }

}
