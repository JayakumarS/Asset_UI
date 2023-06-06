import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
//import { MatDialogRef } from '@angular/material/dialog/dialog-ref';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import { KnowledgeService } from '../../knowledge.service';

@Component({
  selector: 'app-knowledge-delete',
  templateUrl: './knowledge-delete.component.html',
  styleUrls: ['./knowledge-delete.component.sass']
})
export class KnowledgeDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<KnowledgeDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public KnowledgeService: KnowledgeService,public router: Router,public notificationService:NotificationService) { }
    
    deletefile(): void {
      this.KnowledgeService.knowledgeDelete(this.data.id,this.router,this.notificationService);
    }

      // this.dialogRef.close({data: true})
      // this.KnowledgeService.knowledgeDelete(this.data.id);
      
          onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit(): void {
  }

}
