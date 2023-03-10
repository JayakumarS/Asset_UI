export class ReconciliationReport {

    auditName:number;
    assetId:string;
    manageAuditNo:string;
    startDate:string;
    endDate:string;
    makerStatus:string;
    checkerStatus:string;
    companyStatus:string;
    auditType:string;
    roleId:number;
    status:string;
    manageAuditId:number;
  auditorName:string;
  locationName:string;
  auditCompanyName:string;
  auditbranchName:string;
  loginedUser:string;
  auditReportDetail:any;
  
  
    constructor(ReconciliationReport) {
      {
        this.auditName = ReconciliationReport.auditName || "";
        this.manageAuditNo = ReconciliationReport.manageAuditNo || "";
        this.startDate = ReconciliationReport.startDate || "";
        this.endDate = ReconciliationReport.endDate || "";
        this.makerStatus = ReconciliationReport.makerStatus || "";
        this.checkerStatus = ReconciliationReport.checkerStatus || "";
        this.companyStatus = ReconciliationReport.companyStatus || "";
        this.auditType = ReconciliationReport.auditType || "";
  
      }
  }
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
  
  }
  