import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsageMonitorService } from '../../usage-monitor.service';

@Component({
  selector: 'app-delete-usage-monitor',
  templateUrl: './delete-usage-monitor.component.html',
  styleUrls: ['./delete-usage-monitor.component.sass']
})
export class DeleteUsageMonitorComponent  implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteUsageMonitorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public locationMasterService: UsageMonitorService) { }
    
    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true })
    }

  ngOnInit(): void {
  }

}
