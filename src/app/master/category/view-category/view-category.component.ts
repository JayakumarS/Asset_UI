import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Itsupportservice } from 'src/app/helpdesk/it-support/it-support.service';
import { CategoryMasterService } from '../category.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.sass']
})
export class ViewCategoryComponent implements OnInit {
  roleId: any;
  requestId: any;
  docForm: FormGroup;
  list: any;
  loginedUser: any;

  constructor(
    public route: ActivatedRoute,
    private router:Router,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private httpService: HttpServiceService,
    public categoryMasterService: CategoryMasterService,
    public tokenStorage: TokenStorageService,
    private fb: FormBuilder,
  ) { 

    this.docForm = this.fb.group({
      categoryName:['']
    });
  }



  ngOnInit(): void {
    this.roleId=this.tokenStorage.getRoleId();
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.view(this.requestId) ;
      }
     });
    }

// view

view(id:any){
  this.httpService.get<any>(this.categoryMasterService. viewcategory+"?id="+id).subscribe({
  next: (data) => {
    this.list = data.assetCategoryBean;
    
  },
  error: (error) => {
  }
});
}

back(){
      this.router.navigate(['/master/category/list-category']);
    }

  }