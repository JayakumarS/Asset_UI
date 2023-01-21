import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "initiatePayment",
    loadChildren: () =>
      import("./initiate-payment/initiate-payment.module").then((m) => m.InitiatePaymentModule),
  },
  {
    path: "paymentsHistory",
    loadChildren: () =>
      import("./payments-history/payments-history.module").then((m) => m.PaymentsHistoryModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
