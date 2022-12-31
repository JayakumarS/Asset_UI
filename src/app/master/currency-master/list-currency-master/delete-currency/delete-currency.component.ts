import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrencyMasterService } from '../../currency-master.service';

@Component({
  selector: 'app-delete-currency',
  templateUrl: './delete-currency.component.html',
  styleUrls: ['./delete-currency.component.sass']
})
export class DeleteCurrencyComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteCurrencyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public currencyMasterService: CurrencyMasterService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true })
    }

  ngOnInit(): void {
  }

}
