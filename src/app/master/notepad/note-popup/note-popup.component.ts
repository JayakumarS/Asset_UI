import { Component, OnInit } from '@angular/core';
import { Message } from '../Message';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { Router } from '@angular/router';
import { NotePopupService } from './note-popup.service';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-note-popup',
  templateUrl: './note-popup.component.html',
  styleUrls: ['./note-popup.component.sass']
})
export class NotePopupComponent implements OnInit {

  noteMessage: string;
  MessageIO: Array<Message> = [];
  MessageIOEdit: Array<Message> = [];
  MessageIOObj: any;
  MessageIOObjEdit: any;
  showButton: Array<boolean>;
  showButtonEdit: Array<boolean>;
  index: number = 0;
  EditedMessage: string;
  docForm: FormGroup;
  

  constructor(public dialog: MatDialog,private fb: FormBuilder,private httpService: HttpServiceService, private noteService : NotePopupService,private notificationService: NotificationService,
    private router:Router) { }

  ngOnInit(): void {
     this.httpService.get<any>(this.noteService.save).subscribe({
    
    next: (data) => {
      this.MessageIO=data;
    },
    error: (error) => {

    }
  }
  );
  this.docForm = this.fb.group({
      message:[""],
      messageEdit:[""],
   })
  }

  AddNote() {
    //if (this.text != '') {
     if( this.docForm.value.message !=''){
      
      }
      if (this.docForm.controls.message.value != '') {
      this.MessageIOObj = new Message();
      this.MessageIOObj.text = this.docForm.controls.message.value;
      this.MessageIOObj.index = this.index;

      const obj={
        'text':this.docForm.controls.message.value,
        'index': this.MessageIOObj.index
      }
      
    this.noteService.saveNote(obj,this.router,this.notificationService);
     
    
    

      this.MessageIO.push(this.MessageIOObj);
      
      this.docForm.patchValue({
        message:''
      })
      //this.text = '';
      this.index++;
    }
    
  }

  RemoveNote(NoteEdit) {
    this.MessageIO.splice(this.MessageIO.indexOf(NoteEdit), 1);
    NoteEdit.deletingId=1;
    NoteEdit.editId=1;
    location.reload()
   // this.noteService.DeleteNote(NoteEdit);
    this.httpService.get<any>(this.noteService.delete+"?editId="+NoteEdit.id).subscribe({
    
      next: (data) => {
        this.MessageIO=data;
      },
      
      error: (error) => {
  
      }
    }
    );
  }

}
