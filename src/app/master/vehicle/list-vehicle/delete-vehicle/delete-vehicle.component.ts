import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehicleService } from '../../vehicle.service';

@Component({
  selector: 'app-delete-vehicle',
  templateUrl: './delete-vehicle.component.html',
  styleUrls: ['./delete-vehicle.component.sass']
})
export class DeleteVehicleComponent {

 

 
  constructor(public dialogRef: MatDialogRef<DeleteVehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public vehicleService: VehicleService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true });
    }
    ngOnInit(): void {
    }

  }
