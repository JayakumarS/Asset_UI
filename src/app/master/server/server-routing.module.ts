import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddServerComponent } from './add-server/add-server.component';
import { ListServerComponent } from './list-server/list-server.component';
import { ViewServerComponent } from './view-server/view-server.component';

const routes: Routes = [
    {
      path: "add-server/:id",
      component: AddServerComponent,
    },
    {
      path: "list-server",
      component: ListServerComponent,
    },
    {
      path: "view-server/:id",
      component: ViewServerComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServerRoutingModule { }
