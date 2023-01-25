import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { ListBranchComponent } from './list-branch/list-branch.component';

const routes: Routes = [
  {
    path:"addBranch",
    component:AddBranchComponent,
  },
  {
    path:"listBranch",
    component:ListBranchComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
