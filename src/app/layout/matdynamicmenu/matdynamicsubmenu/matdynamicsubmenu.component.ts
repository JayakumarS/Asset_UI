import { Component, OnInit,ViewChild, Input, Renderer2 } from '@angular/core';
import {NavItem} from '../nav-items';
import {MatMenuTrigger} from '@angular/material/menu';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-matdynamicsubmenu',
  templateUrl: './matdynamicsubmenu.component.html',
  styleUrls: ['./matdynamicsubmenu.component.sass']
})
export class MatdynamicsubmenuComponent implements OnInit {

  @Input() items: NavItem[];
  @ViewChild('childMenu', {static: true}) public childMenu: any;
  @Input() ptrigger: MatMenuTrigger;
  @Input() buttonenter: boolean;
  @Input() pindex;
  isMatMenuOpen = false;
  @Input() dataMap: Map<string, boolean>;
  @Input() matMenuTriggers : Map<string, MatMenuTrigger>;
  @Input() button: Renderer2;


  constructor(private ren: Renderer2) {
    
  }
  
 
  closeMymenu(trigger, haschild, pindex, index, button) {
    console.log('close-menu')
    setTimeout(() => {
      if(this.dataMap == null){
        this.dataMap = new Map<string, boolean>();
      }
      if(this.matMenuTriggers == null){
        this.matMenuTriggers = new  Map<string, MatMenuTrigger>();
      }
      let mapindex = pindex+'-'+index;
      this.dataMap.delete(mapindex)
      if(this.dataMap.size == 0){             
        for (let entry of this.matMenuTriggers.entries()) {
          if(entry[1] != null){
            entry[1].closeMenu();
          }         
        }      
        this.ptrigger.closeMenu();
        trigger.closeMenu(); 
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
        this.matMenuTriggers.clear;
      }
    }, 100)
  }

  openMymenu(trigger, haschild, pindex, index) {
    console.log('open-menu')
    if(this.dataMap == null){
      this.dataMap = new Map<string, boolean>();
    }
    if(this.matMenuTriggers == null){
      this.matMenuTriggers = new  Map<string, MatMenuTrigger>();
    }
    let mapindex = pindex+'-'+index;
    this.dataMap.set(mapindex, true);    
    this.matMenuTriggers.set(mapindex, trigger);
    if(haschild){      
      trigger.openMenu();
    }
    
  }
 
  ngOnInit() {
    

  }

}
