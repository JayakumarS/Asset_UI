import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { BankReceiptservice } from '../../bank-reciepts.service';

@Component({
  selector: 'app-delete-bank-receipt',
  templateUrl: './delete-bank-receipt.component.html',
  styleUrls: ['./delete-bank-receipt.component.sass']
})
export class DeleteBankReceiptComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteBankReceiptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bankReceiptService: BankReceiptservice,
    public router: Router,private notificationService: NotificationService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  confirmDelete(): void {
    this.bankReceiptService.DeleteBankReceipt(this.data.voucherNo,this.router,this.notificationService)
  }
  ngOnInit(): void {
  }

}
