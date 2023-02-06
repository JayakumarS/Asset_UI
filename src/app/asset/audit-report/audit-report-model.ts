export class AuditReport {
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
    
    constructor(auditReport) {
        {
          this.auditName = auditReport.auditName || "";
          this.manageAuditNo = auditReport.manageAuditNo || "";
          this.startDate = auditReport.startDate || "";
          this.endDate = auditReport.endDate || "";
          this.makerStatus = auditReport.makerStatus || "";
          this.checkerStatus = auditReport.checkerStatus || "";
          this.companyStatus = auditReport.companyStatus || "";
          this.auditType = auditReport.auditType || "";
         
        }
      }
     
	

} 