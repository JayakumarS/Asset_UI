import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReferralCodeService } from '../../referral-code.service';

@Component({
  selector: 'app-delete-referral-code',
  templateUrl: './delete-referral-code.component.html',
  styleUrls: ['./delete-referral-code.component.sass']
})
export class DeleteReferralCodeComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteReferralCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public referralCodeService : ReferralCodeService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
    this.referralCodeService.referralCodeDelete(this.data.auditor);

  }
}
