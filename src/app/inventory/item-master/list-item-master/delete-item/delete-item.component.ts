import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemMasterService } from '../../item-master.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.sass']
})
export class DeleteItemComponent implements OnInit {


     constructor( public dialogRef: MatDialogRef<DeleteItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public itemMasterService: ItemMasterService,private snackBar: MatSnackBar,) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.itemMasterService.itemDelete(this.data.itemId);
      this.showNotification(
        "snackbar-success",

        "Delete Record Successfully...!!!",
        "bottom",
        "center"
      );
    }

    showNotification(colorName, text, placementFrom, placementAlign) {
      this.snackBar.open(text, "", {
        duration: 2000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }

  }

  // ngOnInit(): void {
  // }










  


