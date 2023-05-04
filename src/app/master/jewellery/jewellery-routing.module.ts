import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddJewelleryDetailsComponent } from './add-jewellery-details/add-jewellery-details.component';
import { ListJewelleryDetailsComponent } from './list-jewellery-details/list-jewellery-details.component';
import { DeleteJewelleryDetailsComponent } from './list-jewellery-details/delete-jewellery-details/delete-jewellery-details.component';


const routes: Routes = [

  {
    path : "list-jewellery-details",
    component : ListJewelleryDetailsComponent,
  },
{
  path : "add-jewellery-details/:id",
  component : AddJewelleryDetailsComponent,
},
{
  path : "delete-jewellery-details",
  component : DeleteJewelleryDetailsComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JewelleryRoutingModule { }
