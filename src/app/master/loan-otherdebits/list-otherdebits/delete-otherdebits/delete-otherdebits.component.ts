import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoanOtherdebitsService } from '../../loan-otherdebits.service';

@Component({
  selector: 'app-delete-otherdebits',
  templateUrl: './delete-otherdebits.component.html',
  styleUrls: ['./delete-otherdebits.component.sass']
})
export class DeleteOtherdebitsComponent implements OnInit {

  constructor(public loanOtherdebitsService: LoanOtherdebitsService,public dialogRef: MatDialogRef<DeleteOtherdebitsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.dialogRef.close({ data: true });
  }
  ngOnInit(): void {
  }

}


