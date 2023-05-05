import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { PropertyService } from '../../property.service';

@Component({
  selector: 'app-delete-property',
  templateUrl: './delete-property.component.html',
  styleUrls: ['./delete-property.component.sass']
})
export class DeletePropertyComponent {

  constructor(public dialogRef: MatDialogRef<DeletePropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public propertyService: PropertyService,public router: Router,public notificationService:NotificationService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
  confirmDelete(): void {
    this.propertyService.propertyDelete(this.data.id,this.router,this.notificationService);
    }

}
