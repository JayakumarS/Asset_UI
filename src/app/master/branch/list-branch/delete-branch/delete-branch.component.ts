import { Component, OnInit , Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { BranchService } from '../../branch.service';
@Component({
  selector: 'app-delete-branch',
  templateUrl: './delete-branch.component.html',
  styleUrls: ['./delete-branch.component.sass']
})
export class DeleteBranchComponent  {

  constructor(public dialogRef: MatDialogRef<DeleteBranchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public branchService: BranchService,
    public router: Router,public notificationService:NotificationService) { }
  

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.branchService.DeleteBranch(this.data.branchId,this.router,this.notificationService);
    }

}
