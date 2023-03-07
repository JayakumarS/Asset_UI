export class UtilityChangeLogReport {

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


  constructor(UtilityChangeLogReport) {
    {
      this.auditName = UtilityChangeLogReport.auditName || "";
      this.manageAuditNo = UtilityChangeLogReport.manageAuditNo || "";
      this.startDate = UtilityChangeLogReport.startDate || "";
      this.endDate = UtilityChangeLogReport.endDate || "";
      this.makerStatus = UtilityChangeLogReport.makerStatus || "";
      this.checkerStatus = UtilityChangeLogReport.checkerStatus || "";
      this.companyStatus = UtilityChangeLogReport.companyStatus || "";
      this.auditType = UtilityChangeLogReport.auditType || "";

    }
}
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }

}
