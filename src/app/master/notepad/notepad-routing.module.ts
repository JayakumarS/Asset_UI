import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotepadComponent } from './notepad.component';

const routes: Routes = [
  {
    path:"add-note",
    component:NotepadComponent,
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotepadRoutingModule { }
