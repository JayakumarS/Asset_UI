import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndividualWidgetComponent } from './individual-widget/individual-widget.component';
import { IndividualInformationComponent } from './individual-information/individual-information.component';

const routes: Routes = [
  {
    path: "allMaster/:id",
    component: IndividualWidgetComponent,
  },
  {
    path: "individualInfo/:id",
    component: IndividualInformationComponent,
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetRoutingModule { }
