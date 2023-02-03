import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentHistoryAddComponent } from './payment-history-add/payment-history-add.component';
import { PaymentHistoryAuditorComponent } from './payment-history-auditor/payment-history-auditor.component';
import { PaymentHistoryListComponent } from './payment-history-list/payment-history-list.component';
import { PaymentsHistoryComponent } from './payments-history-view/payments-history-view.component';

const routes: Routes = [
  {
    path:"printPayment/:id",
    component:PaymentsHistoryComponent,
  },
  {
    path:"payment-history-add",
    component:PaymentHistoryAddComponent,
  },
  {
    path:"payment-history-list",
    component:PaymentHistoryListComponent,
  },
  {
    path:"payment-history-auditor",
    component:PaymentHistoryAuditorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsHistoryRoutingModule { }
