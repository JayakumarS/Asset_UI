import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddReceivablesComponent } from './add-receivables/add-receivables.component';
import { ListReceivablesComponent } from './list-receivables/list-receivables.component';

const routes: Routes = [{
  path:"add-receivables/:id",
  component: AddReceivablesComponent,
},
{
path:"list-receivables",
component:ListReceivablesComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanReceivablesRoutingModule { }
