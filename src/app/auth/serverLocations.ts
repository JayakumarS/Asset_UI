import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class serverLocations {
  apiServerAddress: any;
  constructor() {
    if (window.location.hostname === 'localhost') {
      //Local
      this.apiServerAddress = 'http://localhost:8080/';
      //this.apiServerAddress = 'http://183.82.246.248:8080/assetchek/';
    } else if (window.location.hostname === '91.75.72.212') {
      //For Server Added 
      this.apiServerAddress = 'http://183.82.246.248:8080/assetchek/';
    } 
    
  }
}
export const VARIABLE_SERVICE_PROVIDER = [
  serverLocations
];
