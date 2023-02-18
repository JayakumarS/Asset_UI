import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StateServiceService } from '../../state-service.service';

@Component({
  selector: 'app-delete-state',
  templateUrl: './delete-state.component.html',
  styleUrls: ['./delete-state.component.sass']
})
export class DeleteStateComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteStateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public stateServiceService: StateServiceService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
    confirmDelete(): void {
      this.dialogRef.close({ data: true });
    }
  ngOnInit(): void {
  }

}
