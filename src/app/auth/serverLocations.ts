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
      //this.apiServerAddress = 'http://192.168.5.26:8080/assetchek/';
    } else if (window.location.hostname === '192.168.5.26') {
      //For Server Added 
      this.apiServerAddress = 'http://192.168.5.26:8080/assetchek/';
    } 
    
  }
}
export const VARIABLE_SERVICE_PROVIDER = [
  serverLocations
];
