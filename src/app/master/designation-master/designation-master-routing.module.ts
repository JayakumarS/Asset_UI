import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDesingnationMasterComponent} from './add-desingnation-master/add-desingnation-master.component';
import { ListDesingnationMasterComponent } from './list-desingnation-master/list-desingnation-master.component';
const routes: Routes = [
{
  path:"add-designation/:id",
  component:AddDesingnationMasterComponent,
},
{
  path:"list-designation",
  component:ListDesingnationMasterComponent,
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationMasterRoutingModule { }
