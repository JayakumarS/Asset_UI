import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CountryMasterService } from '../../../country-master.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent {

  constructor( public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public countryMasterService: CountryMasterService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.countryMasterService.deleteEmployees(this.data.countryCode);
    }

}
