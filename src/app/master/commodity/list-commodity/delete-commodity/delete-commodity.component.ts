import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommodityService } from '../../commodity.service';

@Component({
  selector: 'app-delete-commodity',
  templateUrl: './delete-commodity.component.html',
  styleUrls: ['./delete-commodity.component.sass']
})
export class DeleteCommodityComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteCommodityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public commodityService: CommodityService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.commodityService.deleteCommodity(this.data.vendorId);

    }
  ngOnInit(): void {
  }

}
