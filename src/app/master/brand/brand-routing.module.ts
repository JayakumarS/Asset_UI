import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { ListBrandComponent } from './list-brand/list-brand.component';

const routes: Routes = [

  {
    path:"addBrand/:id",
    component:AddBrandComponent,
  },
  {
    path:"listBrand",
    component:ListBrandComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
