import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsHistoryComponent } from './payments-history/payments-history.component';

const routes: Routes = [
  {
    path:"paymentsHistory",
    component:PaymentsHistoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsHistoryRoutingModule { }
