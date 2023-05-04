import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFundComponent } from './list-fund/list-fund.component';
import { AddFundComponent } from './add-fund/add-fund.component';

const routes: Routes = [
{
  path:"add-fund/:id",
  component:AddFundComponent,
},
{
  path:"list-fund",
  component:ListFundComponent,
},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MutualfundRoutingModule { }
