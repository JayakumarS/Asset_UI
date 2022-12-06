import { Component, Inject , OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CustomerMasterService } from '../../customer-master.service';
@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.sass']
})
export class DeleteCustomerComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public customerMasterService: CustomerMasterService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
confirmDelete(): void {
  this.customerMasterService.customerMasterDelete(this.data.cusCode);
}

}
