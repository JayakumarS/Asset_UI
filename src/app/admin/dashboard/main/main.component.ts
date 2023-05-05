import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle,
  ApexResponsive,
} from "ng-apexcharts";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AuditableAssetResultBean } from "src/app/audit/auditable-asset/auditable-asset-result-bean";
import { AuditableAssetService } from "src/app/audit/auditable-asset/auditable-asset.service";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { MainResultBean } from "../main-result-bean";
import { MainService } from "../main.service";
import { MatDialog } from "@angular/material/dialog";
import { ActivityPopUpComponent } from "../../schedule-activity/activity-pop-up/activity-pop-up.component";
import * as moment from 'moment';
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { CommonService } from "src/app/common-service/common.service";
import { ChangePasswordPopUpComponent } from "src/app/user/change-password-pop-up/change-password-pop-up.component";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
  labels: string[];
  markers: ApexMarkers;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
};

// Highcharts

import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';
import HC_drilldown from "highcharts/modules/drilldown";
import { Router } from "@angular/router";
HC_drilldown(Highcharts);

@Component({


  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  
  docForm: FormGroup;
  assetsCount = [];
  auditableAssetList = [];
  assetList = [];
  companyAssetList = [];
  assetListDashboard = [];
  bookValueArray = [];
  bookValueArrayData = [];
  pieValueArray = [];
  columnOuterValueArray = [];
  columnInnerValueArray = [];
  userLogListDashboard = [];
  // Drilldown array
  chartOptionsColumnChart: Highcharts.Options;
  namePushingArray = [];
  //Donut Array
  donutName = [];
  donutValue = [];
  
  public cardChart1: any;
  public cardChart1Data: any;
  public cardChart1Label: any;

  public cardChart2: any;
  public cardChart2Data: any;
  public cardChart2Label: any;

  public cardChart3: any;
  public cardChart3Data: any;
  public cardChart3Label: any;

  public cardChart4: any;
  public cardChart4Data: any;
  public cardChart4Label: any;

  public areaChartOptions: Partial<ChartOptions>;
  public barChartOptions: Partial<ChartOptions>;
  public projectOptions: Partial<ChartOptions>;
  public performanceRateChartOptions: Partial<ChartOptions>;
  // Basic Bar Chart
  public chartOptionsBarChart: Partial<ChartOptions>;

  // Doughnut chart start
  public doughnutChartLabels: string[] = ["Refurbished", "In stock", "In repair", "Damaged","New", "Existing","scarp"];
  // public doughnutChartLabels: string[];
  public doughnutChartData: number[] = [2, 3, 5, 1, 6,4,2];
  // public doughnutChartData:number[];
  public doughnutChartLegend = false;
  public doughnutChartColors: any[] = [
    {
      backgroundColor: ["#735A84", "#E76412", "#9BC311", "#DC3545" , "#ff9966", "#FFFFF", "#bbbb"],
      // backgroundColor: ["#e86f66"],
    },
  ];
  public doughnutChartType = "doughnut";
  public doughnutChartOptions: any = {
    animation: false,
    responsive: true,
  };
  earningsCountValue: any;
  auditorsCountValue: any;
  assetsCountValue: any;
  usersCountValue: any;
  purchaseAssetsCountValue: any;
  depreciatedCountValue: any;
  config1: { itemsPerPage: number; currentPage: number; totalItems: number; };
  popUpFlag:string;
  activityflag: string;
  companyId: any;
  companyPurchaseAssetsCount: any;
  companyUsersAssetsCount: any;
  companyEarningsAssetsCount: any;
  roleId: any;
  roleIdFlag:boolean=false;
  companyAuditorsAssetsCount: any;
  companyAssetsCount: any;
  pwdStatus: any;
  flowChartFlag:boolean;
  assetsFlagForDashboard:boolean;
  pieChartFlag:boolean;
  ticketFlag:boolean;
  Page=1;
  pageSize=5;
  Page1=1;
  pageSize1=5;
// For HighChart

Highcharts: typeof Highcharts = Highcharts;
@ViewChild("chart") chart: ChartComponent;
@ViewChild('chart') componentRef;
chartRef;
updateFlag;

// Pagination
config: {
  id : string,
  itemsPerPage: number,
  currentPage: number,
  totalItems: number
};

configDepreciation: {
  id : string,
  itemsPerPage: number,
  currentPage: number,
  totalItems: number
};

configUserLog: {
  id : string,
  itemsPerPage: number,
  currentPage: number,
  totalItems: number
};

  companyLastAuditDate: any;
  companyLastAuditDoneBy: any;
  compltedProfile: any;

  constructor(private httpService:HttpServiceService,private mainService:MainService,private fb: FormBuilder,private commonService:CommonService,
    public auditableAssetService:AuditableAssetService,public dialog: MatDialog,private tokenStorage: TokenStorageService,public router: Router,
    ) {}
    
  ngOnInit() {
     
    this.docForm = this.fb.group({
      assetid:[""]
    });

    this.smallChart1();
    this.smallChart2();
    this.smallChart3();
    this.smallChart4();
    this.chart1();
    this.chart2();
    this.chart4();
    this.projectChart();

    // Basic Bar Chart
   this.basicBarChart();

    this.companyId=this.tokenStorage.getCompanyId();
    this.roleId=this.tokenStorage.getRoleId();
    
    
    if(this.roleId==3){
      this.roleIdFlag=true;
    }
    else if(this.roleId==2){
      this.roleIdFlag=false;
    }

    this.httpService.get<MainResultBean>(this.mainService.earningsListCountUrl).subscribe(
      (data) => {
        console.log(data);
        this.earningsCountValue = data.earningsCount;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.httpService.get<MainResultBean>(this.mainService.auditorsListCountUrl).subscribe(
      (data) => {
        console.log(data);
        this.auditorsCountValue = data.auditorsCount;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.httpService.get<MainResultBean>(this.mainService.assetsListCountUrl).subscribe(
      (data) => {
        console.log(data);
        this.assetsCountValue = data.assetsCount;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.httpService.get<MainResultBean>(this.mainService.usersListCountUrl).subscribe(
      (data) => {
        console.log(data);
        this.usersCountValue = data.usersCount;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.httpService.get<MainResultBean>(this.mainService.assetsListCountUrl).subscribe(
      (doughnutChartData) => {
        console.log(doughnutChartData);
        this.assetsCount.push(doughnutChartData.assetsCount);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.httpService.get<MainResultBean>(this.mainService.purchaseAssetsCountUrl).subscribe(
      (data) => {
        console.log(data);
        this.purchaseAssetsCountValue = data.purchaseAssetsCount;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    this.httpService.get<MainResultBean>(this.mainService.depreciatedCountUrl).subscribe(
      (data) => {
        console.log(data);
        this.depreciatedCountValue = data.depreciatedCount;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
    

    this.httpService.get<AuditableAssetResultBean>(this.auditableAssetService.assetListDashboardUrl+ "?companyId=" + this.companyId).subscribe(
      (data) => {
        this.assetListDashboard = data.assetListDashboard;
        if(data.assetListDashboard.length!=0){
          this.assetsFlagForDashboard=true;
        }else{
          this.assetsFlagForDashboard=false;
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );


    //User Log Report List
    
    this.httpService.get<AuditableAssetResultBean>(this.mainService.userLogListUrl+ "?companyId=" + this.companyId).subscribe(
      (data) => {
        this.userLogListDashboard = data.getUserLogListForDashboard;
        this.configUserLog = {
          id: 'pagination',    
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.userLogListDashboard.length
        }; 
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    // ticket survey
    this.httpService.get<any>(this.mainService.getItSupportTicketURL+ "?companyId=" + parseInt(this.companyId)).subscribe(
      (data) => {
        this.barChartOptions.series=data.getTicketListGraphForClient;
        if(data.getTicketListGraphForClient.length!=0){
          for(let i=0;i<data.getTicketListGraphForClient.length;i++){
            if(data.getTicketListGraphForClient[i].data!=0){
              this.ticketFlag=true;
            }
            // else{
            // }
          }
        }else{
          this.ticketFlag=false;
        }
        
        console.log(this.barChartOptions);
    });

    this.activityflag=this.tokenStorage.getSavepopUpFlag();
    ////chart Asset Survey Dynamic List
    // this.httpService.get<any>(this.mainService.getAssetSurveyURL).subscribe(
    //   (data) => {
    //     this.projectOptions.series=data.getAssetListGraph
        
    //     console.log(this.projectOptions);
    // }); 


    // Company based Auditor count service
    this.companyBasedCount(this.companyId,this.roleId);

   

    this.getInvList();
    this.getAssetList();
    // bar chart default call
    // this.fetchAssetName(16);
    // this.popUp();
   }

  companyBasedCount(companyId,roleId:any){
    this.httpService.get<MainResultBean>(this.mainService.companyAuditorsCountUrl + "?auditors=" + companyId +"&roleId="+roleId).subscribe((doughnutChartData: any) => {
      console.log(this.companyId);
      this.compltedProfile=doughnutChartData.completedProfile;

      this.companyPurchaseAssetsCount = doughnutChartData.companyPurchaseAssetsCount;
      this.companyUsersAssetsCount = doughnutChartData.companyUsersAssetsCount;
      //Amount
      if(doughnutChartData.companyEarningsAssetsCount!=null){
        this.companyEarningsAssetsCount = doughnutChartData.companyEarningsAssetsCount;
      }else{
        this.companyEarningsAssetsCount="0";
      }
      //Auditors
      if(doughnutChartData.companyAuditorsAssetsCount!=null){
        this.companyAuditorsAssetsCount = doughnutChartData.companyAuditorsAssetsCount;
      }else{
        this.companyAuditorsAssetsCount = "-";
      }
      
      this.companyAssetsCount = doughnutChartData.companyAssetsCount;
      //Last Audit Date
      if(doughnutChartData.companyLastAuditDate!=null){
        this.companyLastAuditDate = doughnutChartData.companyLastAuditDate;
      }else{
        this.companyLastAuditDate = "-";
      }
      //Last Audit Done By
      if(doughnutChartData.companyLastAuditDoneBy!=null){
        this.companyLastAuditDoneBy = doughnutChartData.companyLastAuditDoneBy;
      }else{
        this.companyLastAuditDoneBy = "-";
      }
      
      //For Donut Data
      if(doughnutChartData.getDonutValue.length != 0){
        this.doughnutChartLabels = doughnutChartData.getDonutName;
        this.doughnutChartData = doughnutChartData.getDonutValue;
      }
      //For Pie Chart
      this.pieValueArray=doughnutChartData.getpieChartValue;
        this.chartOptionsPieChart.series[0] = {
          type: 'pie',
          data: this.pieValueArray
      }
      console.log(this.pieValueArray[0].y);
      //Pie chart hide flag
      if(this.pieValueArray[0].y!=0 || this.pieValueArray[1].y!=0 || this.pieValueArray[2].y!=0 || this.pieValueArray[3].y!=0){
        this.pieChartFlag=true;
      }else{
        this.pieChartFlag=false;
      }

      // Column with Drilldown Chart
      if(doughnutChartData.getOuterColumnChart.length!=0){
       // **For Outer value 
      this.columnOuterValueArray=doughnutChartData.getOuterColumnChart;

      // **For Inner Value
      // Spliting into array
      for(let i=0;i<doughnutChartData.getInnerColumnChart.length;i++){
        let name;
        name=doughnutChartData.getInnerColumnChart[i].name.split(",",doughnutChartData.getInnerColumnChart.length+1);
        this.namePushingArray.push(name);
      }
      // Converting into respective format
      const perChunk = 2 // items per chunk 
      for(let i=0;i<this.namePushingArray.length;i++){
      let bean = {name:'',id:'',type:'column',data:[]}
      const result = this.namePushingArray[i].reduce((resultArray, item, index) => { 
          const chunkIndex = Math.floor(index/perChunk)
          if(!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
          }
          // condition for odd index value converting into int
          if(index%2==0){
            resultArray[chunkIndex].push(item);
          }else{
            resultArray[chunkIndex].push(parseInt(item));
          }
        return resultArray
      }, [])

      bean.name=doughnutChartData.getInnerColumnChart[i].name;
      bean.id=doughnutChartData.getInnerColumnChart[i].name;
      bean.data=result;
      this.columnInnerValueArray.push(bean);
      }
      // Calling the Drilldown chart
      this.drilldownChart();

      this.flowChartFlag=true;
      }else{
        this.flowChartFlag=false;
      }
      
      this.updateFlag = true; 
      console.log(doughnutChartData.getInnerColumnChart);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );

    this.getInvList();
    this.getAssetList();

    this.httpService.get<any>(this.commonService.getPwdStatus + "?userId=" + this.tokenStorage.getUserId()).subscribe((result: any) => {
      this.pwdStatus=result.addressBean[0].pwdStatus;
      if(!this.pwdStatus){
        const dialogRef = this.dialog.open(ChangePasswordPopUpComponent, {
          disableClose: true ,
          height: "500px",
          width: "465px",
      
        });
      }
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
    // bar chart default call
    // this.fetchAssetName(16);
    // this.popUp();
    
  }
 
  popUp(){
  if(this.activityflag==null){
    const dialogRef = this.dialog.open(ActivityPopUpComponent, {
      width: "30%",
      height: "40%",

    });
    this.popUpFlag="true";
    this.tokenStorage.savepopUpFlag(this.popUpFlag);
  }

  }

  fetchAssetName(asset:any){

    this.httpService.get<any>(this.mainService.getAssetSurveyURL + "?assetId=" +asset+"&asset="+'').subscribe(
      (data) => {
        this.projectOptions.series=data.getAssetListGraph
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
    this.clientSurvayGraph(asset);
    this.barChartGraph(asset);
    this.handleUpdate(asset);
  }

  handleUpdate(asset:any) {
    this.httpService.get<any>(this.mainService.getbookValueEndGraphURL + "?assetId=" +asset+"&asset="+'').subscribe(
      (data) => {
        this.bookValueArray=data.getBookEndValue;
        this.chartOptionsLollipop.series[0] = {
          type: 'area',
          data: this.bookValueArray
        }
        this.updateFlag = true;
      console.log(this.chartOptionsLollipop.series);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
   
  }

  clientSurvayGraph(asset:any){

    this.httpService.get<any>(this.mainService.getClientSurveyURL + "?assetId=" +asset+"&asset="+'').subscribe(
      (data) => {
        this.areaChartOptions.series=data.getAssetListGraphForClient
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
    
  }

  barChartGraph(asset:any){
    this.httpService.get<any>(this.mainService.getBarChartURL + "?assetId=" +asset+"&asset="+'').subscribe(
      (data) => {
        this.chartOptionsBarChart.series=data.getBarChartListGraph
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  // Area HighChart

    chartOptionsLollipop: Options = {
        accessibility: {
          point: {
              valueDescriptionFormat: '{index}. {xDescription}, {point.y}.'
          }
      },

      credits: {
        enabled: false
      },
    
      legend: {
          enabled: false
      },
    
      subtitle: {
          text: ''
      },
    
      title: {
          text: 'Asset Book Value End'
      },
    
      tooltip: {
          shared: true
      },
    
      xAxis: {
          type: 'category'
      },
    
      yAxis: {
          title: {
              text: 'Book Value End'
          }
      },
        series: [
          {
            type: 'area',
            name: 'Book Value End',
             data:[{name: '2023', y: 901},
             {name: '2024', y: 700},
             {name: '2025', y: 620},
             {name: '2026', y: 300},
             {name: '2027', y: 150},
             {name: '2028', y: 50},]
          }
        ]
      };
      

      // Pie Chart
      chartOptionsPieChart: Options = {
        
        accessibility: {
          point: {
              valueDescriptionFormat: '{index}. {xDescription}, {point.y}.'
          }
      },

      credits: {
        enabled: false
      },
    
      legend: {
          enabled: false
      },
    
      subtitle: {
          text: ''
      },
    
      title: {
          text: 'Summary'
      },
    
      tooltip: {
          // shared: true
          pointFormatter: function () {
            // return this.series.name + ': ' + this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
      },
    
      xAxis: {
          type: 'category'
      },
    
      yAxis: {
          title: {
              text: 'Book Value'
          }
      },
        series: [
          {
            type: 'pie',
            name: 'Value',
             data:[{name: 'Total Purchased', y: 8},
             {name: 'Total Depreciated', y: 23},
             {name: 'Total Sold', y: 8},
             {name: 'Total Scraped', y: 7}]
          }
        ]
      };

    // Column Chart
    drilldownChart(){
    this.chartOptionsColumnChart = {
      chart: {
        events: {
          drilldown: () => {
            // console.log(this.drilldownData);
          }
        }
    },
      accessibility: {
        announceNewData: {
          enabled: true
      }
    },

    credits: {
      enabled: false
    },
  
    legend: {
        enabled: false
    },
  
    plotOptions: {
      series: {
          borderWidth: 0,
          dataLabels: {
              enabled: true,
	            inside: false,
	            formatter: function () {
	                return Highcharts.numberFormat(this.y, 0, '', ',');
	            },
              // enabled: true,
              // format: '{point.y:,0f}'
          }
      }
  },

    subtitle: {
        text: ''
    },
  
    title: {
        text: ''
    },
    tooltip: {
      // headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      // pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:,3f}</b> <br/>',
      pointFormatter: function () {
        // return this.series.name + ': ' + this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
  
    xAxis: {
        type: 'category'
    },
  
    yAxis: {
        title: {
            text: 'Amount'
        },
    },
      series: [
        {
          type: 'column',
          name: 'Assets',
          colorByPoint: true,
           data:this.columnOuterValueArray
        }
      ],
      drilldown: {
        breadcrumbs: {
            position: {
                align: 'right'
            }
        },
        series:this.columnInnerValueArray
      //   [
      //     {
      //         name: 'Internet Explorer',
      //         id: 'Internet Explorer',
      //         type:'column',
      //         data: [
      //             [
      //                 'da',
      //                 600
      //             ],
      //             [
      //                 'v10.0',
      //                 0.29
      //             ],
      //             [
      //                 'v9.0',
      //                 0.27
      //             ]
      //         ]
      //     },
      //     {
      //         name: 'Opera',
      //         id: 'Opera',
      //         type:'column',
      //         data: [
      //             [
      //                 'v49.0',
      //                 0.82
      //             ],
      //             [
      //                 'v12.1',
      //                 0.14
      //             ]
      //         ]
      //     }
      // ]

    } as Highcharts.DrilldownOptions
    };

  }

  chartCallback: Highcharts.ChartCallbackFunction = chart => {
    this.chartRef = chart;
  };

  basicBarChart(){
    this.chartOptionsBarChart = {
      series: [
        {
          name: "Book Value",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "Depreciation",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        {
          name: "Accrued Depreciation",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          // endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
        "2023",
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030",
        "2031",
        ]
      },
      yaxis: {
        title: {
          text: "Amount",
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              // return y.toFixed(0) + "k" + " dollars";
              return y.toFixed(2);
            }
            return y;
          },
        },
      }
    };
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  pageChangedDepreciation(event){
    this.configDepreciation.currentPage = event;
  }

  pageChangedForUserLog(event){
    this.configUserLog.currentPage = event;
  }

  
  getInvList(){
    // All Asset List
    // this.httpService.get<MainResultBean>(this.mainService.getAuditableAssetListUrl).subscribe(
    //   (data) => {
        
    //     this.auditableAssetList = data.auditableAssetList;
    //     this.config1 = {
    //       itemsPerPage: 5,
    //       currentPage: 1,
    //       totalItems: this.auditableAssetList.length
    //     }; 
    //   }
    // );

    this.httpService.get<MainResultBean>(this.mainService.AuditableAssetListDashboardUrl + "?companyId=" + this.companyId).subscribe((res: any) => {
      console.log(this.companyId);
      this.auditableAssetList = res.auditableAssetListDashboard;
      this.configDepreciation = {
        id: 'pagination',    
        itemsPerPage: 2,
        currentPage: 1,
        totalItems: this.auditableAssetList.length
      }; 
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );

  }

  getAssetList(){

    // if(this.roleIdFlag==false){
    //   this.httpService.get<MainResultBean>(this.mainService.getAssetListUrl).subscribe(
    //     (data) => {
          
    //       this.assetList = data.getAssetListDashboard;
    //       this.config = {
    //         id: 'pagination',    
    //         itemsPerPage: 5,
    //         currentPage: 1,
    //         totalItems: this.assetList.length
    //       }; 
    //     }
    //   );
    // }
    // else{
      this.httpService.get<MainResultBean>(this.mainService.getCompanyAssetListUrl + "?companyId=" + this.companyId).subscribe((res: any) => {
        console.log(this.companyId);
        this.companyAssetList = res.assetList;
        this.config = {
          id: 'pagination',    
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.companyAssetList.length
        }; 
        },
        (err: HttpErrorResponse) => {
           // error code here
        }
      );
    // }

  }

  private smallChart1() {
    this.cardChart1 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart1Data = [
      {
        label: "New Clients",
        data: [50, 61, 80, 50, 72, 52, 60, 41, 30, 45, 70, 40, 93, 63, 50, 62],
        borderWidth: 4,
        pointStyle: "circle",
        pointRadius: 4,
        borderColor: "rgba(103,119,239,.7)",
        pointBackgroundColor: "rgba(103,119,239,.2)",
        backgroundColor: "rgba(103,119,239,.2)",
        pointBorderColor: "transparent",
      },
    ];
    this.cardChart1Label = [
      "16-07-2018",
      "17-07-2018",
      "18-07-2018",
      "19-07-2018",
      "20-07-2018",
      "21-07-2018",
      "22-07-2018",
      "23-07-2018",
      "24-07-2018",
      "25-07-2018",
      "26-07-2018",
      "27-07-2018",
      "28-07-2018",
      "29-07-2018",
      "30-07-2018",
      "31-07-2018",
    ];
  }
  private smallChart2() {
    this.cardChart2 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart2Data = [
      {
        label: "New Clients",
        data: [50, 61, 80, 50, 40, 93, 63, 50, 62, 72, 52, 60, 41, 30, 45, 70],
        borderWidth: 4,
        pointStyle: "circle",
        pointRadius: 4,
        borderColor: "rgba(253,126,20,.7)",
        pointBackgroundColor: "rgba(253,126,20,.2)",
        backgroundColor: "rgba(253,126,20,.2)",
        pointBorderColor: "transparent",
      },
    ];
    this.cardChart2Label = [
      "16-07-2018",
      "17-07-2018",
      "18-07-2018",
      "19-07-2018",
      "20-07-2018",
      "21-07-2018",
      "22-07-2018",
      "23-07-2018",
      "24-07-2018",
      "25-07-2018",
      "26-07-2018",
      "27-07-2018",
      "28-07-2018",
      "29-07-2018",
      "30-07-2018",
      "31-07-2018",
    ];
  }
  private smallChart3() {
    this.cardChart3 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart3Data = [
      {
        label: "New Clients",
        data: [52, 60, 41, 30, 45, 70, 50, 61, 80, 50, 72, 40, 93, 63, 50, 62],
        borderWidth: 4,
        pointStyle: "circle",
        pointRadius: 4,
        borderColor: "rgba(40,167,69,.7)",
        pointBackgroundColor: "rgba(40,167,69,.2)",
        backgroundColor: "rgba(40,167,69,.2)",
        pointBorderColor: "transparent",
      },
    ];
    this.cardChart3Label = [
      "16-07-2018",
      "17-07-2018",
      "18-07-2018",
      "19-07-2018",
      "20-07-2018",
      "21-07-2018",
      "22-07-2018",
      "23-07-2018",
      "24-07-2018",
      "25-07-2018",
      "26-07-2018",
      "27-07-2018",
      "28-07-2018",
      "29-07-2018",
      "30-07-2018",
      "31-07-2018",
    ];
  }
  private smallChart4() {
    this.cardChart4 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart4Data = [
      {
        label: "New Clients",
        data: [30, 45, 70, 40, 93, 63, 50, 62, 50, 61, 80, 50, 72, 52, 60, 41],
        borderWidth: 4,
        pointStyle: "circle",
        pointRadius: 4,
        borderColor: "rgba(0,123,255,.7)",
        pointBackgroundColor: "rgba(0,123,255,.2)",
        backgroundColor: "rgba(0,123,255,.2)",
        pointBorderColor: "transparent",
      },
    ];
    this.cardChart4Label = [
      "16-07-2018",
      "17-07-2018",
      "18-07-2018",
      "19-07-2018",
      "20-07-2018",
      "21-07-2018",
      "22-07-2018",
      "23-07-2018",
      "24-07-2018",
      "25-07-2018",
      "26-07-2018",
      "27-07-2018",
      "28-07-2018",
      "29-07-2018",
      "30-07-2018",
      "31-07-2018",
    ];
  }
  private chart1() {
    this.areaChartOptions = {
      series: [
        {
          name: "Book Value",
          data: [31, 40, 28, 51, 42, 85, 77],
        },
        {
          name: "Depreciation",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
        {
          name: "Accrued Depreciation",
          data: [11, 32, 25, 32, 77, 52, 15],
        },
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
        foreColor: "#9aa0ac",
      },
      colors: ["#FC8380", "#6973C6", "#006600"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        // categories: [
        //   "2018-09-19",
        //   "2018-09-20",
        //   "2018-09-21",
        //   "2018-09-22",
        //   "2018-09-23",
        //   "2018-09-24",
        //   "2018-09-25",
        // ],
        categories: [
          "01/01/2023",
          "01/01/2024",
          "01/01/2025",
          "01/01/2026",
          "01/01/2027",
          "01/01/2028",
          "01/01/2029",
        ],
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 0,
      },

      tooltip: {
        theme: "dark",
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: "Closed",
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: "Assigned",
          data: [13, 23, 20, 8, 13, 27],
        },
        {
          name: "Opened",
          data: [11, 17, 15, 15, 21, 14],
        },
        {
          name: "Hold",
          data: [21, 7, 25, 13, 22, 8],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        foreColor: "#9aa0ac",
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "category",
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 0.8,
        colors: ["#01B8AA", "#374649", "#FD625E", "#F2C80F"],
      },
      tooltip: {
        theme: "dark",
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }

  private projectChart() {
    this.projectOptions = {
      series: [
        {
          name: "Book Value",
          type: "column",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
        },
        {
          name: "Depreciation",
          type: "area",
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
        },
        {
          name: "Accrued Depreciation",
          type: "line",
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
        },
      ],
      chart: {
        height: 400,
        type: "line",
        stacked: false,
        foreColor: "#9aa0ac",
      },
      colors: ["#7F7D7F", "#AC93E5", "#FEA861"],
      stroke: {
        width: [0, 2, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      // labels: [
      //   "01/01/2003",
      //   "02/01/2003",
      //   "03/01/2003",
      //   "04/01/2003",
      //   "05/01/2003",
      //   "06/01/2003",
      //   "07/01/2003",
      //   "08/01/2003",
      //   "09/01/2003",
      //   "10/01/2003",
      //   "11/01/2003",
      // ],
      labels: [
        "01/01/2023",
        "01/01/2024",
        "01/01/2025",
        "01/01/2026",
        "01/01/2027",
        "01/01/2028",
        "01/01/2029",
        "01/01/2030",
        "01/01/2031",
        "01/01/2032",
        "01/01/2033",
      ],
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: "Amount",
        },
        min: 0,
      },
      tooltip: {
        theme: "dark",
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              // return y.toFixed(0) + "k" + " dollars";
              return y.toFixed(2);
            }
            return y;
          },
        },
      },
    };
  }

  private chart4() {
    this.performanceRateChartOptions = {
      series: [
        {
          name: "Bill Amount",
          data: [113, 120, 130, 120, 125, 119, 126],
        },
      ],
      chart: {
        height: 380,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        foreColor: "#9aa0ac",
        toolbar: {
          show: false,
        },
      },
      colors: ["#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        title: {
          text: "Weekday",
        },
      },
      yaxis: {
        title: {
          text: "Bill Amount($)",
        },
      },
      tooltip: {
        theme: "dark",
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }

  onChange(){
    var userId=this.tokenStorage.getCompanyId()
    window.sessionStorage.setItem("findFrom", "Opened");
    window.sessionStorage.setItem("TabFrom", "");
    window.sessionStorage.setItem("CompanyFrom","");
    window.sessionStorage.setItem("DepartMentFrom","");
    window.sessionStorage.setItem("LocationFrom","");
    window.sessionStorage.setItem("VendorFrom","");
    window.sessionStorage.setItem("StateFrom","");
    window.sessionStorage.setItem("LineFrom","");

    this.router.navigate(['master/company/addCompany/'+userId]);
  }


  onChangeIndividual(){
    var userId=this.tokenStorage.getCompanyId();
    window.sessionStorage.setItem("TabFromInd","");
    window.sessionStorage.setItem("propFrom", "");
    window.sessionStorage.setItem("vehicleFrom","");
    window.sessionStorage.setItem("jewelFrom","");
    window.sessionStorage.setItem("fixedFrom","");
    window.sessionStorage.setItem("mutualFrom","");
    window.sessionStorage.setItem("loanFrom","");
    window.sessionStorage.setItem("receivableFrom","");
    this.router.navigate(['master/multiple/allMaster/'+userId]);
  }

  onchangeAsset(){
    this.router.navigate(['asset/assetMaster/listAssetMaster/']);

  }
  onchangeAuditor(){
    this.router.navigate(['master/Activity-master/list-activity/']);

  }
  onchangeComEmp(){
    this.router.navigate(['master/Company-Employees/listCompanyEmp/']);

  }
  viewCall(data) {
    this.router.navigate(['/asset/assetMaster/viewAssetMaster/' + data.id]);
  }
}
