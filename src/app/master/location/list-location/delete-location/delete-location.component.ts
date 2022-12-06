import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationMasterService } from '../../location-master.service';

@Component({
  selector: 'app-delete-location',
  templateUrl: './delete-location.component.html',
  styleUrls: ['./delete-location.component.sass']
})
export class DeleteLocationComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public locationMasterService: LocationMasterService) { }
    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.locationMasterService.locationDelete(this.data.cslLocationCode);

    }

  ngOnInit(): void {
  }

}
