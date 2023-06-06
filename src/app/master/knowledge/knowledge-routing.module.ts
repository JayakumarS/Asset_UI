import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KnowledgeBankComponent } from './knowledge-bank/knowledge-bank.component';

const routes: Routes = [
  {
    path: "knowledgebank",
    component: KnowledgeBankComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowledgeRoutingModule { }
