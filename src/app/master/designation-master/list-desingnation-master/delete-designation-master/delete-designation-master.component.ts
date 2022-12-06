import { Component, OnInit , Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DesignationMasterService } from '../../designation-master.service';

@Component({
  selector: 'app-delete-designation-master',
  templateUrl: './delete-designation-master.component.html',
  styleUrls: ['./delete-designation-master.component.sass']
})
export class DeleteDesignationMasterComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDesignationMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public designationMasterService: DesignationMasterService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.designationMasterService.DeleteDesignationMaster(this.data.desgnCode);
    }


}
