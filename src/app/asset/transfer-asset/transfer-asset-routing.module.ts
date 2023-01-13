import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTransferComponent } from './add-transfer/add-transfer.component';
import { ListTransferComponent } from './list-transfer/list-transfer.component';

const routes: Routes = [ {
  path:"addtransfer/:id",
  component:AddTransferComponent,
},
{
  path:"listtransfer",
  component:ListTransferComponent,
},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferAssetRoutingModule { }
