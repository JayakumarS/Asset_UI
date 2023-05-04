


import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FixedDepositService } from '../../fixed-deposit.service';


@Component({
  selector: 'app-delete-fixed-deposit',
  templateUrl: './delete-fixed-deposit.component.html',
  styleUrls: ['./delete-fixed-deposit.component.sass']
})
export class DeleteFixedDepositComponent implements OnInit {
 
  constructor(public fixedDepositService: FixedDepositService,public dialogRef: MatDialogRef<DeleteFixedDepositComponent>,
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
