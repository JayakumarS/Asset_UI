import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBackupLocationComponent } from './add-backup-location/add-backup-location.component';
import { ListBackupLocationComponent } from './list-backup-location/list-backup-location.component';
import { ViewBackupLocationComponent } from './view-backup-location/view-backup-location.component';

const routes: Routes = [
  {
      path: "add-backup-location/:id",
      component: AddBackupLocationComponent,
    },
    {
      path: "list-backup-location",
      component: ListBackupLocationComponent,
    },
    {
      path: "view-backup-location/:id",
      component: ViewBackupLocationComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackupLocationRoutingModule { }
