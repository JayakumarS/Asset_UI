import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddConsoleLogComponent } from './add-console-log/add-console-log.component';
import { ListConsoleLogComponent } from './list-console-log/list-console-log.component';

const routes: Routes = [
  {
    path: "listConsoleLog",
    component: ListConsoleLogComponent,
  },
  {
    path: "addConsoleLog/:id",
    component: AddConsoleLogComponent,
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleLogModule { }
