import { Component, OnInit } from '@angular/core';

declare var getConfiguration: any;

@Component({
  selector: 'app-warehouse-positioning',
  templateUrl: './warehouse-positioning.component.html',
  styleUrls: ['./warehouse-positioning.component.sass']
})
export class WarehousePositioningComponent implements OnInit {

  
  constructor() { 
    
  }

  ngOnInit(): void {
    new getConfiguration();
  }


}
