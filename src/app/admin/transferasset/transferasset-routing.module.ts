import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtransferComponent } from './addtransfer/addtransfer.component';

const routes: Routes = [ {
  path:"addtransfer",
  component:AddtransferComponent,
},

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferassetRoutingModule { }
