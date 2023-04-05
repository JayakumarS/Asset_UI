import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { SelectionModel } from "@angular/cdk/collections";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { CommonService } from "src/app/common-service/common.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { CategoryMasterService } from '../category.service';
import { Assetcategory } from '../category.model';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListCategoryComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  docForm: FormGroup;
  companyId: any;
  assetcategory: Assetcategory;
 
  mainList =[];
  expandedElement: MainList | null;
  expandedSubElement: SubList | null;
  innerExpandedElements: any[] = [];
  glList=[];
  gllist: MainList[] = [];
  isExpand:boolean=true;
  itemCategoryList = [];

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('subSort') subSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<SubList>>;

  dataSource: MatTableDataSource<User>;
  usersData: User[] = [];
  columnsToDisplay = ["actions",
  "categoryName",
  "Description",
  "isactive",
  
  
];
  innerDisplayedColumns = ["categoryName",
  "Description",
  "isactive",
  "action"

  ];
  subBlockDisplayedColumns = ["sourceLocation", "destinationLocation", "reference"];
  permissionList: any;

  id: number;


  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private httpService: HttpServiceService,
    public router: Router,
    private fb: FormBuilder,
    private categoryMasterService: CategoryMasterService,
    private cmnService: CommonService,
    private cd: ChangeDetectorRef,
    private commonService: CommonService,
    private tokenStorage: TokenStorageService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations
  ) {
    super();
    {
    }
    this.docForm = this.fb.group({
      item: [""],
      category: [""],
      companyId: parseInt(this.tokenStorage.getCompanyId()),
    });
  }


  ngOnInit(): void {
    this.viewReport();
    this.companyId = parseInt(this.tokenStorage.getCompanyId());
    // Location dropdown
    const permissionObj = {
      formCode: 'F1023',
      roleId: this.tokenStorage.getRoleId()
    }
    this.spinner.show();
    this.commonService.getAllPagePermission(permissionObj).subscribe({
      next: (data) => {
        this.spinner.hide();
        if (data.success) {
          this.permissionList = data;
        }
      },
      error: (error) => {
        this.spinner.hide();
      }
    });
  }
  

  viewReport() {
    this.assetcategory = this.docForm.value;
    this.usersData = [];
    this.spinner.show();
    this.categoryMasterService
      .getAssetcategory(this.assetcategory)
      .subscribe({
        next: (res: any) => {
          this.spinner.hide();
          if (res != null) {
            this.mainList =res.categoryMasterDetails;
            this.mainList.forEach((user) => {
              if (
                user.subList &&
                Array.isArray(user.subList) &&
                user.subList.length
              ) {
                const subList: SubList[] = [];
        
                user.subList.forEach((address) => {
                  // if (Array.isArray(address.blocks)) {
                    subList.push({
                      ...address,
                      subList: new MatTableDataSource(address),
                    });
                  // }
                });
        
                this.usersData.push({
                  ...user,
                  subList: new MatTableDataSource(subList),
                });
              } else {
                this.usersData = [...this.usersData, user];
              }
            });
            this.dataSource = new MatTableDataSource(this.usersData);
            this.dataSource.sort = this.sort;
          }
        },
        error: (error) => {
          this.spinner.hide();
          this.showNotification(
            "snackbar-danger",
            error.message + "...!!!",
            "bottom",
            "center"
          );
        },
      });
  }


  editCall(row) {
    if (this.permissionList?.modify){
      this.router.navigate(['/master/category/add-category/' + row.category_id]);
    }

  }

  viewCall(row){
    this.router.navigate(['/master/category/view-category/' + row.category_id]);

}

  deleteItem(row){

    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteCategoryComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {


      if (data.data == true) {

        this.httpService.get(this.categoryMasterService.deletecategory+ "?category_id=" + this.id).subscribe((res: any) => {
          this.showNotification(
            "snackbar-success",
            "Delete Record Successfully...!!!",
            "bottom",
            "center"
          );
        },
          (err: HttpErrorResponse) => {
            // error code here
          }
        );


      } 

    });

  }

  
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 4000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  profileView(id) {
    sessionStorage.setItem("Inventory", "true");
    this.router.navigate(["/asset/assetMaster/viewAssetMaster/" + id]);
  }



  reset() {
    this.docForm = this.fb.group({
      item: [""],
      category: [""],
      companyId: parseInt(this.tokenStorage.getCompanyId()),
    });
    this.viewReport();
  }

  toggleRow(element: MainList) {
    this.isExpand = false;
    element.subList &&
      (element?.subList as MatTableDataSource<SubList>).data.length
      ? (this.expandedElement =
        this.expandedElement === element ? null : element)
      : null;
      

    this.cd.detectChanges();
    this.innerTables.forEach(
      (table, index) =>
      ((table.dataSource as MatTableDataSource<SubList>).sort =
        this.innerSort.toArray()[index])
    );
    
  }


  applyFilter(filterValue: string) {
    this.innerTables.forEach(
      (table, index) =>
        ((table.dataSource as MatTableDataSource<SubList>).filter = filterValue.trim().toLowerCase())
    );
  }
}

export interface User {
  assetItem: string;
  categoryName: string;
  totalqty: string;
  addresses?: Address[] | MatTableDataSource<Address>;
}

export interface Address {
  assetItem: string;
  categoryName: string;
  totalqty: string;
  blocks?: Block[] | MatTableDataSource<Block>;
}

export interface Block {
  sourceLocation: string;
  destinationLocation: string;
  reference: string;
}

export interface UserDataSource {
  assetItem: string;
  categoryName: string;
  totalqty: string;
  addresses?: MatTableDataSource<Address>;
}

export interface MainList {

  categoryName:String;
  Description:String;
  isactive:String;
  action:String;
  subList?: SubList[] | MatTableDataSource<SubList>;
}

export interface SubList {
  categoryName:String;
  Description:String;
  isactive:String;
}