import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListReferralCodeComponent } from './list-referral-code/list-referral-code.component';

const routes: Routes = [
  {
    path:"listReferralCode",
    component:ListReferralCodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferralCodeRoutingModule { }
