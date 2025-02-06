

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { BackupLocationService } from '../backup-location.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Component({
  selector: 'app-view-backup-location',
  templateUrl: './view-backup-location.component.html',
  styleUrls: ['./view-backup-location.component.sass']
})
export class ViewBackupLocationComponent implements OnInit {

  requestId: any;
  viewDtl: any;
  backupLocationList: any = [];

  constructor(
    public route: ActivatedRoute,
    private router:Router,
    public httpClient: HttpClient,
    private httpService : HttpServiceService,
    public dialog: MatDialog,
    public backupLocationService: BackupLocationService,
    public tokenStorage: TokenStorageService,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id !== undefined && params.id !== 0) {
        this.requestId = params.id;
        this.fetchDetails(this.requestId);
      }
    });
  }

  fetchDetails(locationId: any): void {
    this.httpService.get<any>(`${this.backupLocationService.editbackuplocation}?location_id=${locationId}`).subscribe({
      next: (res: any) => {
        this.viewDtl = res.backupLocationBean;
        this.backupLocationList = res.backupLocationBeanList;
      },
      error: (err) => console.log(err)
    });
  }

  back(){
    this.router.navigate(['/master/backup-location/list-backup-location']);
  }

}
