import { ListDeliveryNoteComponent } from './list-delivery-note/list-delivery-note.component';
import { AddDeliveryNoteComponent } from './add-delivery-note/add-delivery-note.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "addDeliveryNote",
    component: AddDeliveryNoteComponent,
  },
  {
    path: "listDeliveryNote",
    component: ListDeliveryNoteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryNoteRoutingModule { }
