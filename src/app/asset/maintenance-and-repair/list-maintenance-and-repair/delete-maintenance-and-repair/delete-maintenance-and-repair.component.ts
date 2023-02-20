import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { MaintenanceAndRepairService } from '../../maintenance-and-repair.service';

@Component({
  selector: 'app-delete-maintenance-and-repair',
  templateUrl: './delete-maintenance-and-repair.component.html',
  styleUrls: ['./delete-maintenance-and-repair.component.sass']
})
export class DeleteMaintenanceAndRepairComponent  {
  constructor( public dialogRef: MatDialogRef<DeleteMaintenanceAndRepairComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public maintenanceAndRepairService: MaintenanceAndRepairService,
    private router:Router,private notificationService:NotificationService,) { }
 
    onNoClick(): void {
      this.dialogRef.close();
    }
  confirmDelete(): void {
    this.maintenanceAndRepairService.maintenanceAndRepairDelete(this.data.maintenanceId,this.router,this.notificationService);

  }
}
