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
    } else if (window.location.hostname === '213.42.28.68') {
      //For Server Added 
      this.apiServerAddress = 'http://65.108.201.61:8090/assetchek/';
    } else if (window.location.hostname === '216.48.181.97') {
      //For Server Added 
      this.apiServerAddress = 'http://216.48.181.97:8080/assetchek/';
    } else if (window.location.hostname === 'assetchek.com') {
      //For Server Added 
      this.apiServerAddress = 'https://assetchek.com:8443/assetchek/';
    } else if (window.location.hostname === 'www.assetchek.com') {
      //For Server Added 
      this.apiServerAddress = 'https://assetchek.com:8443/assetchek/';
    } 
    
  }
}
export const VARIABLE_SERVICE_PROVIDER = [
  serverLocations
];
