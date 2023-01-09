import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepreciationComponent } from './add-depreciation/add-depreciation.component';
import { ListDepreciationComponent } from './list-depreciation/list-depreciation.component';

const routes: Routes = [

  {
    path:"add-depreciation/:id",
    component:AddDepreciationComponent,
  },
  {
    path:"list-depreciation",
    component:ListDepreciationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepreciationRoutingModule { }
