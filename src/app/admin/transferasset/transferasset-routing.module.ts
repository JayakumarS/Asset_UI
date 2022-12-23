import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtransferComponent } from './addtransfer/addtransfer.component';
import { ListtransferComponent } from './listtransfer/listtransfer.component';

const routes: Routes = [ {
  path:"addtransfer/:id",
  component:AddtransferComponent,
},
{
  path:"listtransfer",
  component:ListtransferComponent,
},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferassetRoutingModule { }
