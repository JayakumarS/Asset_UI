import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndividualSubscriptionComponent } from './individual-subscription/individual-subscription.component';

const routes: Routes = [
  {
    path: "add-subscription",
    component: IndividualSubscriptionComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualSubscriptionRoutingModule { }
