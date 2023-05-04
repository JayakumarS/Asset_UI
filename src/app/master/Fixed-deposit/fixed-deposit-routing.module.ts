import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFixedDepositComponent } from './list-fixed-deposit/list-fixed-deposit.component';
import { AddFixedDepositComponent } from './add-fixed-deposit/add-fixed-deposit.component';
import { DeleteFixedDepositComponent } from './list-fixed-deposit/delete-fixed-deposit/delete-fixed-deposit.component';

const routes: Routes = [
  {
    path: "list-fixed-deposit",
    component: ListFixedDepositComponent,
  },
  {
    path: "add-fixed-deposit/:id",
    component: AddFixedDepositComponent,
  },
  {
    path: "delete-fixed-deposite",
    component: DeleteFixedDepositComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixedDepositRoutingModule { }
