import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityService } from '../../city.service';

@Component({
  selector: 'app-delete-city',
  templateUrl: './delete-city.component.html',
  styleUrls: ['./delete-city.component.sass']
})
export class DeleteCityComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    publiccityService : CityService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true });
    }
  ngOnInit(): void {
  }

}
