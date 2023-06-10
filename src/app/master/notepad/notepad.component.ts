import { Component, ElementRef, OnInit } from '@angular/core';
import { Message } from './Message';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotepadService } from './notepad.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { note } from './notepad-model';
import { MatDialog } from '@angular/material/dialog';
import { NotePopupComponent } from './note-popup/note-popup.component';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, map, merge } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
//import { Message } from 'src/app/angular-bot/chat.service';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit  {
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
  editIndex: any;
  edited: any;
  searchInput: any;
  
  constructor(private el:ElementRef, private token: TokenStorageService,public dialog: MatDialog,private fb: FormBuilder,private httpService: HttpServiceService, private noteService : NotepadService,private notificationService: NotificationService,
    private router:Router) {
    this.noteMessage = '';
    this.showButton = [];
    this.showButtonEdit = [];
  }

  ngOnInit(): void {
  
   this.httpService.get<any>(this.noteService.getList+"?UserId="+this.token.getUserId()).subscribe({
    
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
      textAr:[""],
      searchValue:[""]
   })

   const inpu = document.getElementById('searchValue') as HTMLInputElement;

   inpu.oninput = () => {
    this.search();
   }

  }

  AddNote() {
    //if (this.text != '') {
      if (this.docForm.controls.message.value != '') {
      this.MessageIOObj = new Message();
      this.MessageIOObj.text = this.docForm.controls.message.value;
      this.MessageIOObj.index = this.index;

      const obj={
        'text':this.docForm.controls.message.value,
        'index': this.MessageIOObj.index,
        'userId':this.token.getUserId()
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

  note(){
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(NotePopupComponent, {
      data: {

        action: "add",
      },
      direction: tempDirection,
    });

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

  EditNote(NoteEdit,messageVal) {
 
     this.editIndex=NoteEdit;
    const invalidControl = this.el.nativeElement.querySelector('[id="' + NoteEdit + '"]');
        invalidControl.focus();
        return;
   
    // this.docForm.patchValue({
    //   'messageEdit':messageVal.text
    // })
    // this.EditedMessage=messageVal;

    // if (this.showButtonEdit[NoteEdit] == null) {
    //   this.showButtonEdit[NoteEdit] = false;
    // }
    // this.showButtonEdit[NoteEdit] = !this.showButtonEdit[NoteEdit];
  }

  
  EditMessage(NoteEdit,indexNote) {
    
    NoteEdit.noteMessage = this.EditedMessage;
    this.edited=document.getElementById(indexNote);
    //this.MessageIO[NoteEdit.index].text = this.docForm.controls.messageEdit.value;

    this.showButtonEdit[NoteEdit.index] = false;
    this.showButton[NoteEdit.index] = false;
    this.EditedMessage = '';
    

    const obj={
      'text':this.edited.value,
      'index': NoteEdit.index,
      'editId':NoteEdit.id
      
    }
  
    this.noteService.updateNote(obj,this.router,this.notificationService);
   
  }


 
  

  search(){
    this.searchInput=document.getElementById("searchValue");
    this.httpService.get<any>(this.noteService.searchList+"?text="+this.searchInput.value).subscribe({
    
      next: (data) => {
        this.MessageIO=data;
      },
      error: (error) => {
  
      }
    }
    );

  }
 
  ShowButton(index) {
    if (this.showButton[index] == null) {
      this.showButton[index] = false;
    }
    this.showButton[index] = !this.showButton[index];
    this.showButtonEdit[index] = false;
  }
  reset () {
    location.reload()
    this.docForm = this.fb.group({
      })
      }

 
}



