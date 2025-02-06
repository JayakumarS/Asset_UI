import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddApplicationDetailsComponent } from './add-application-details/add-application-details.component';
import { ListApplictionDetailsComponent } from './list-appliction-details/list-appliction-details.component';
import { ViewApplicationDetailsComponent } from './view-application-details/view-application-details.component';



const routes: Routes = [
  {
    path: "add-application-details/:id",
    component: AddApplicationDetailsComponent,
  },
  {
    path: "list-application-details",
    component: ListApplictionDetailsComponent,
  },
  {
    path: "view-application-details/:id",
    component: ViewApplicationDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationDetailsRoutingModule { }
