import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Message {
  constructor(public author: string, public content: string) {}
}
declare var webkitSpeechRecognition:any

export class ChatService {

  recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords!: string;
    
  constructor() { }


  conversation = new Subject<Message[]>();
  messageMap = {
    "Hi": "Hello",
    "hi": "Hello",
    "Who are you": "I'm chat Bot",
    "who are you": "I'm chat Bot",
    "What is your role": "Just guide for the user",
    "defaultmsg": "I can't understand your text. Can you please repeat"
  }
  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    setTimeout(()=>{
      this.conversation.next([botMessage]);
    }, 1500);
  }
  getBotMessage(question: string){
    let answer = this.messageMap[question];
    return answer || this.messageMap['defaultmsg'];
  }



  /*************************For Speak To Text********** */
  // start() {
  //   this.isStoppedSpeechRecog = false;
  //   this.recognition.start();
  //   console.log("Speech recognition started")
  //   this.recognition.addEventListener('end', () => {
  //     if (this.isStoppedSpeechRecog) {
  //       this.recognition.stop();
  //       console.log("End speech recognition")
  //     } else {
  //       this.wordConcat()
  //       this.recognition.start();
  //     }
  //   });
  // }

  // stop() {
  //   this.isStoppedSpeechRecog = true;
  //   this.wordConcat()
  //   this.recognition.stop();
  //   console.log("End speech recognition")
  // }

  
  // wordConcat() {
  //   this.text = this.text + ' ' + this.tempWords + '.';
  //   this.tempWords = '';
  // }
  // init() {
  //   this.recognition.interimResults = true;
  //   this.recognition.lang = 'en-US';
  //   this.recognition.addEventListener('result', (e: { results: Iterable<unknown> | ArrayLike<unknown>; }) => {
  //     const transcript = Array.from(e.results)
  //       .map((result) => result[0])
  //       .map((result) => result.transcript)
  //       .join('');
  //     this.tempWords = transcript;
  //     console.log(transcript);
  //   });
  // }
  
}
