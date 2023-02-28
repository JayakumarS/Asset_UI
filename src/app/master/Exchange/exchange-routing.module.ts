import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExchangeMasterComponent } from './add-exchange-master/add-exchange-master.component';
import { ListExchangeMasterComponent } from './list-exchange-master/list-exchange-master.component';

const routes: Routes = [{
  path:"addExchange/:id",
  component:AddExchangeMasterComponent,
},
{
path:"listExchange",
component:ListExchangeMasterComponent,
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExchangeRoutingModule { }
