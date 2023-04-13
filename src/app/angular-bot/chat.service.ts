import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Message {
  constructor(public author: string, public content: string) {}
}
export class ChatService {

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
}
