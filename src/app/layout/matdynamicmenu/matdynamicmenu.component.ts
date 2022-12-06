import {Component, ViewEncapsulation,ViewChild, ViewChildren, QueryList,OnInit, Renderer2} from '@angular/core';
import {NavItem} from './nav-items';
import {MatMenuTrigger} from '@angular/material/menu';
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { MatdynamicsubmenuComponent } from './matdynamicsubmenu/matdynamicsubmenu.component';


@Component({
  selector: 'app-matdynamicmenu',
  templateUrl: 'matdynamicmenu.component.html',
  styleUrls: ['matdynamicmenu.component.scss'],
  encapsulation: ViewEncapsulation.None
}) 
export class MatdynamicmenuComponent implements OnInit{ 
 userInf={};
  public dataMap = new Map<string, boolean>();
  public matMenuTriggers = new Map<string, MatMenuTrigger>();

  constructor(private authService: AuthService,private tokenStorage: TokenStorageService, private ren: Renderer2){

  }
  @ViewChild('menu', {static: true}) public childMenu: MatdynamicsubmenuComponent;

  
  closeMyButton(trigger, button, pindex) {
     
  
     setTimeout(() => {
      console.log('close-button',this.matMenuTriggers.size);
      this.dataMap.delete(pindex); 
      //trigger.closeMenu()
      for (let entry of this.matMenuTriggers.entries()) {
        if(entry[1] != null){
          entry[1].closeMenu();
          
          
        }         
      } 
      this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
       if(this.dataMap.size > 0){        
        
       // this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
       // this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
       }
     
   }, 1000)
  }

  openMyButton(trigger, button, pindex) {
    setTimeout(() => {
    console.log('open-button'+this.dataMap.size)
   
    if(this.matMenuTriggers == null){
      this.matMenuTriggers = new  Map<string, MatMenuTrigger>();
    }
    this.dataMap.set(pindex, true);  
    this.matMenuTriggers.set(pindex, trigger);
    trigger.openMenu();
    console.log(trigger)
    console.log(this.childMenu)
    this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
  });
  }


navItems: NavItem[];
test : string;
ngOnInit(){
    this.authService.getFormPropertyMenu(this.tokenStorage.getUserId()).subscribe(
      data => { 
        console.log(data);
       this.navItems = data.moduleLevelList; 
      //this.test = "";
      },
        error => {
            
           
        }
    );
}


  
    
}

  
