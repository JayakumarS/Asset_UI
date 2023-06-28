import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBirthdayComponent } from './add-birthday/add-birthday.component';


const routes: Routes = [

   {
     path: "add-birthday",
     component: AddBirthdayComponent,
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BirthdayReminderRoutingModule { }
