import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndividualWidgetComponent } from './individual-widget/individual-widget.component';

const routes: Routes = [
  {
    path: "allMaster/:id",
    component: IndividualWidgetComponent,
  }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetRoutingModule { }
