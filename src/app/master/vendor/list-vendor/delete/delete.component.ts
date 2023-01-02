import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VendorService } from '../../vendor.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})

export class DeleteVendorComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteVendorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public vendorService: VendorService) { }

    onNoClick(): void {
      this.dialogRef.close({ data: 'CANCEL' })
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true })
    }

  ngOnInit(): void {
  }

}

