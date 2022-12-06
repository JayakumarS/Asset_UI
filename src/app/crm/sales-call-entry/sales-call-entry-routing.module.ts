import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSalesEntryComponent } from './list-sales-entry/list-sales-entry.component';
import { AddSalesEntryComponent } from './add-sales-entry/add-sales-entry.component';

const routes: Routes = [
  {
    path:"listSalesCallEntry",
    component: ListSalesEntryComponent,
  },
  {
    path:"addSalesCallEntry/:id",
    component: AddSalesEntryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesCallEntryRoutingModule { }
