import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryMasterService } from 'src/app/master/country-master/country-master.service';

@Component({
  selector: 'app-delete-listasset',
  templateUrl: './delete-listasset.component.html',
  styleUrls: ['./delete-listasset.component.sass']
})
export class DeleteListassetComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteListassetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public countryMasterService: CountryMasterService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.countryMasterService.deleteasset(this.data.id);
    }

}
