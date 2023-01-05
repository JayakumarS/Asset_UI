
import { formatDate } from "@angular/common";
export class Itsupport {
    ticketno : string;
    tickettype : string;
    asset : string;
    assetnamelist: any;
    assetlocation : string;
    category : string;
    priority : number;
    status : string;
    ticketgroup: string;
    assignee : string;
    tatinday : string;
    reportedby : string;
    id: number;
    reportdate: Date;
    uploadImg: string;
    cc: string;
    description: string;
    report: Boolean;
  Success: boolean;
   
  
  constructor(itsupport) {
    {
      this.id = itsupport.id || this.getRandomID();
      this.ticketno = itsupport.ticketno || "";
      this.tickettype = itsupport.tickettype || "";
      this.asset = itsupport.asset || "";
      this.assetnamelist = itsupport.assetnamelist || "";
      this.assetlocation = itsupport.assetlocation || "";
      this.category = itsupport.category || "";
      this.priority = itsupport.priority || "";
      this.status = itsupport.status || "";
      this.ticketgroup = itsupport.ticketgroup || "";
      this.assignee = itsupport.assignee || "";
      this.tatinday = itsupport.tatinday || "";
      this.reportedby = itsupport.reportedby || "";
      this.reportdate = itsupport.reportdate || "";
      this.uploadImg = itsupport.uploadImg || "";
      this.cc = itsupport.cc || "";
      this.description = itsupport.description || "";
      this.report = itsupport.report || "";
     
    }
    }
  
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}



