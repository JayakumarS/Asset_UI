import { Component, OnInit , Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { DesignationMasterService } from '../../designation-master.service';

@Component({
  selector: 'app-delete-designation-master',
  templateUrl: './delete-designation-master.component.html',
  styleUrls: ['./delete-designation-master.component.sass']
})
export class DeleteDesignationMasterComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDesignationMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public designationMasterService: DesignationMasterService,
    public router: Router,public notificationService:NotificationService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.designationMasterService.DeleteDesignationMaster(this.data.id,this.router,this.notificationService);
    }


}
