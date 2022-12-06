import { Component, Inject , OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { WorkOrderService } from '../../work-order.service';

@Component({
  selector: 'app-delete-work-order',
  templateUrl: './delete-work-order.component.html',
  styleUrls: ['./delete-work-order.component.sass']
})
export class DeleteWorkOrderComponent {

  constructor(public dialogRef: MatDialogRef<DeleteWorkOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public workOrderService: WorkOrderService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  confirmDelete(): void {
    this.workOrderService.workOrderDelete(this.data.workorderNo);
    }

}
