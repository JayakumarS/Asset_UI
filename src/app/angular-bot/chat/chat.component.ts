import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordComponent } from 'src/app/authentication/forgot-password/forgot-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  docForm: FormGroup;
  loginIssue:boolean=false;
  loginpassword: boolean=false;
  loginRegistration: boolean=false;


  Registration:boolean=true;
  password:boolean=true;
  Login:boolean=true;
  constructor(public chatService: ChatService,public dialog: MatDialog,private snackBar: MatSnackBar,
    private fb:FormBuilder,public dialogRef: MatDialog) {

    this.docForm = this.fb.group({
       chat:[""],
    })
   }

  ngOnInit(): void {

    this.chatService.conversation.subscribe((val) => {
      this.messages = this.messages.concat(val);
    });
  }

  onNoClick(): void {
    location.reload();
  }

  sendMessage() {
    this.chatService.getBotAnswer(this.docForm.value.chat);
    this.docForm.value.chat = '';
  }

  forgottenPassword(){
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      height: "70%",
      width: "50%",
    });
  }


  forLogin(){
      this.loginIssue=true;
      this.Registration=false;
      this.password=false;
  }
  forpassword(){
    this.loginpassword=true
    this. Registration=false;
    this.Login=false;
  }

  forRegistration(){
    this.loginRegistration=true;
    this. password=false;
    this.Login=false;
  }

  exist(){
    this.dialogRef.closeAll()
  }

clickMessange(){
  this.exist();
  this.showNotification(
    "snackbar-success",
    "Thanks you. Will contact you shortly...!!!",
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
