import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleActivityService } from '../../schedule-activity.service';

@Component({
  selector: 'app-delete-schedule-activity',
  templateUrl: './delete-schedule-activity.component.html',
  styleUrls: ['./delete-schedule-activity.component.sass']
})
export class DeleteScheduleActivityComponent  {
  constructor( public dialogRef: MatDialogRef<DeleteScheduleActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public scheduleActivityService: ScheduleActivityService) { }
 
    onNoClick(): void {
      this.dialogRef.close();
    }
  confirmDelete(): void {
    this.scheduleActivityService.scheduleDelete(this.data.scheduleId);

  }
}
