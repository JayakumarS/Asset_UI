import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrandMasterService } from '../../brand.service';

@Component({
  selector: 'app-delete-branch',
  templateUrl: './delete-branch.component.html',
  styleUrls: ['./delete-branch.component.sass']
})
export class DeleteBranchComponent implements OnInit {

  constructor(public brandMasterService: BrandMasterService,public dialogRef: MatDialogRef<DeleteBranchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.dialogRef.close({ data: true });
  }
  ngOnInit(): void {
  }

}

