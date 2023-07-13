import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordComponent } from 'src/app/authentication/forgot-password/forgot-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularBotModule } from '../angular-bot.module';
import { timeout } from 'rxjs';


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
  paymentDetail: boolean=false;
  historyDetail: boolean=false;
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
    this.docForm.patchValue({
      'chat' :"",
    })
    this.startTimeout();
    
  }
  sendMessage1() {
    this.chatService.getBotAnswer(this.docForm.value.chat);
    this.docForm.patchValue({
      'chat' :"",
    })
    this.historyDetail=false;
    
  }
  sendMessage2() {
    this.chatService.getBotAnswer(this.docForm.value.chat);
    this.docForm.patchValue({
      'chat' :"",
    })
    this.startTimeout2();
    
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
  // this.docForm.value.chat="Not able to Login";
  this.docForm.value.chat="I would like to know more about payment details";
  // this.docForm.value.chat="Please provide your account details and we will contact you shortly!";
  this.sendMessage();
   this.Registration=false;
   this.password=false;
   
   
}
clickMessange1(){
  // this.docForm.value.chat="Not able to Login";
  this.docForm.value.chat="I would like to know more about bill details";
  // this.docForm.value.chat="Please provide your account details and we will contact you shortly!";
  this.sendMessage1();
   this.Registration=false;
   this.password=false;
   this.paymentDetail=false;
   
}

clickMessange2(){
  // this.docForm.value.chat="Not able to Login";
  this.docForm.value.chat="I would like to know more about bill history";
  // this.docForm.value.chat="Please provide your account details and we will contact you shortly!";
  this.sendMessage2();
   this.Registration=false;
   this.password=false;
   this.paymentDetail=false;
   
}

clickMessange3(){
  // this.docForm.value.chat="Not able to Login";
  this.docForm.value.chat="I would like to know more about current month's bill history";
  // this.docForm.value.chat="Please provide your account details and we will contact you shortly!";
  this.sendMessage1();
   this.Registration=false;
   this.password=false;
   this.paymentDetail=false;
   
}

clickMessange4(){
  // this.docForm.value.chat="Not able to Login";
  this.docForm.value.chat="I would like to know more about old month's bill history";
  // this.docForm.value.chat="Please provide your account details and we will contact you shortly!";
  this.sendMessage1();
   this.Registration=false;
   this.password=false;
   this.paymentDetail=false;
   
   
}



startTimeout(): void {
  this.paymentDetail = false;

  setTimeout(() => {
    
    this.paymentDetail = true;
  }, 2000);
}
startTimeout2(): void {
  this.historyDetail = false;

  setTimeout(() => {
    
    this.historyDetail = true;
  }, 2000);
}

clickServer(){
  this.docForm.value.chat="Server Down";
  this.sendMessage();
}
clicksupport(){
  this.docForm.value.chat="Contact with support";
  this.sendMessage();
}
clickMail(){
  this.docForm.value.chat="For mail not received";
  this.sendMessage();
  
}
clickpassword(){
  this.docForm.value.chat="For password is not working";
  this.sendMessage(); 
}
clickalreadyExist(){
  this.docForm.value.chat="For Email already exist";
  this.sendMessage(); 
}
clickCountry(){
  this.docForm.value.chat="Country not loaded";
  this.sendMessage(); 
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
