

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ServerService } from '../server.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';


@Component({
  selector: 'app-view-server',
  templateUrl: './view-server.component.html',
  styleUrls: ['./view-server.component.sass']
})
export class ViewServerComponent implements OnInit {
  roleId: any;
  requestId: any;
  serverDetails: any;
  serverDetailList: any = [];
  viewDtl: any;
  visiblePasswordIndex: number | null = null; // This will track which password is visible

  constructor(
    public route: ActivatedRoute,
    private router:Router,
    public httpClient: HttpClient,
    private httpService : HttpServiceService,
    public dialog: MatDialog,
    public serverService: ServerService,
    public tokenStorage: TokenStorageService,
    private spinner : NgxSpinnerService
  ) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id !== undefined && params.id !== 0) {
        this.requestId = params.id;
        this.fetchDetails(this.requestId);
      }
    });
  }



  fetchDetails(serverId: any): void {
    this.httpService.get<any>(`${this.serverService.editserver}?server_id=${serverId}`).subscribe({
      next: (res: any) => {
        this.viewDtl = res.serverBean;
        this.serverDetailList = res.serverBeanList;
        this.visiblePasswordIndex = null; 
      },
      error: (err) => console.log(err)
    });
  }

  // initializePasswordVisibility(): void {
  //   // Initialize visibility for each password in the list
  //   this.passwordVisibility = this.serverDetailList.map(() => false);
  // }


  // togglePasswordVisibility(index: number): void {
  //   // Toggle visibility of the clicked password row
  //   this.passwordVisibility[index] = !this.passwordVisibility[index];
  // }

    // Method to toggle visibility for the clicked row's password
    togglePasswordVisibility(index: number): void {
      // If the clicked row is already visible, hide it. Otherwise, show it and hide others.
      if (this.visiblePasswordIndex === index) {
        this.visiblePasswordIndex = null; // Hide password if it's already visible
      } else {
        this.visiblePasswordIndex = index; // Show the clicked password and hide others
      }
    }


  back(){
    this.router.navigate(['/master/server/list-server']);
  }

}
