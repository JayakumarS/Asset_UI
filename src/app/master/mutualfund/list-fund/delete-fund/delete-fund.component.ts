import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { MutualFundService } from '../../mutualfund.service';
@Component({
  selector: 'app-delete-fund',
  templateUrl: './delete-fund.component.html',
  styleUrls: ['./delete-fund.component.sass']
})
export class DeleteFundComponent implements OnInit {
 
  constructor(public mutualFundService: MutualFundService,public dialogRef: MatDialogRef<DeleteFundComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    onNoClick(): void {
      this.dialogRef.close()
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true })
    } 
  ngOnInit(): void {
  }

}



