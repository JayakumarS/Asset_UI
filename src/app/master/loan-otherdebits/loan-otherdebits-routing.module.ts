import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOtherdebitsComponent } from './add-otherdebits/add-otherdebits.component';
import { ListOtherdebitsComponent } from './list-otherdebits/list-otherdebits.component';

const routes: Routes = [
  {
    path: "add-otherdebits/:id", 
    // /:id
    component: AddOtherdebitsComponent,
  },
  {
    path: "list-otherdebits",
    component: ListOtherdebitsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanOtherdebitsRoutingModule { }
