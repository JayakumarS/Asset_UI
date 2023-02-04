export class AuditReport {
    siNo:number;
    assetId:string;
    name:string;
    acquisitionDate:string;
    currency:string;
    acqValue:string;
    accDep:string;
    bookValue:string;
    
    constructor(auditReport) {
        {
          this.siNo = auditReport.siNo || this.getRandomID();
          this.assetId = auditReport.assetId || "";
          this.name = auditReport.name || "";
          this.acquisitionDate = auditReport.acquisitionDate || "";
          this.currency = auditReport.currency || "";
          this.acqValue = auditReport.acqValue || "";
          this.accDep = auditReport.accDep || "";
          this.bookValue = auditReport.bookValue || "";
         
        }
      }
      public getRandomID(): string {
        const S4 = () => {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
      }
	

} 