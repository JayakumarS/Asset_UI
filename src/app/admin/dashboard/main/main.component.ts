import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
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
import { AuditableAssetResultBean } from "src/app/audit/auditable-asset/auditable-asset-result-bean";
import { AuditableAssetService } from "src/app/audit/auditable-asset/auditable-asset.service";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { MainResultBean } from "../main-result-bean";
import { MainService } from "../main.service";
import { MatDialog } from "@angular/material/dialog";
import { ActivityPopUpComponent } from "../../schedule-activity/activity-pop-up/activity-pop-up.component";
import * as moment from 'moment';
import { TokenStorageService } from "src/app/auth/token-storage.service";
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
  assetListDashboard = [];
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

  // Doughnut chart start
  // public doughnutChartLabels: string[] = ["India", "USA", "Itely", "Shrilanka"];
  public doughnutChartLabels: string[] = ["Assets"];
  public doughnutChartData = this.assetsCount;
  public doughnutChartLegend = false;
  public doughnutChartColors: any[] = [
    {
      // backgroundColor: ["#735A84", "#E76412", "#9BC311", "#DC3545"],
      backgroundColor: ["#e86f66"],
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
  companyAuditorCount: string;
  companyPurchaseAssetsCount: any;
  companyUsersAssetsCount: any;

  constructor(private httpService:HttpServiceService,private mainService:MainService,private fb: FormBuilder,
    public auditableAssetService:AuditableAssetService,public dialog: MatDialog,private tokenStorage: TokenStorageService) {}
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

    this.companyAuditorCount=this.tokenStorage.getCompanyId();

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

    this.httpService.get<AuditableAssetResultBean>(this.auditableAssetService.assetListDashboardUrl).subscribe(
      (data) => {
        this.assetListDashboard = data.assetListDashboard;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

    // ticket survey
    this.httpService.get<any>(this.mainService.getItSupportTicketURL).subscribe(
      (data) => {
        this.barChartOptions.series=data.getTicketListGraphForClient;
        
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

    this.httpService.get<MainResultBean>(this.mainService.companyAuditorsCountUrl + "?auditors=" + this.companyAuditorCount).subscribe((res: any) => {
      console.log(this.companyAuditorCount);
      this.companyPurchaseAssetsCount = res.companyPurchaseAssetsCount;
      this.companyUsersAssetsCount = res.companyUsersAssetsCount;
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );

    this.getInvList();
    this.getAssetList();
    this.fetchAssetName(16);
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

  getInvList(){
    this.httpService.get<MainResultBean>(this.mainService.getAuditableAssetListUrl).subscribe(
      (data) => {
        
        this.auditableAssetList = data.auditableAssetList;
        this.config1 = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.auditableAssetList.length
        }; 
      }
    );
  }

  getAssetList(){
    this.httpService.get<MainResultBean>(this.mainService.getAssetListUrl).subscribe(
      (data) => {
        
        this.assetList = data.assetList;
        this.config1 = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.auditableAssetList.length
        }; 
      }
    );
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
          name: "Accured Depreciation",
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
          name: "Accured Depreciation",
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
          text: "Revenue",
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
}
