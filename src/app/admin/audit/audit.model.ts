export class Addaudit{

  auditArray: string;
  startdate: string;
  enddate: string;
  auditname: string;
id: number;

  constructor(addaudit) {
      {
          this.id = addaudit.id ||"";
          this.auditArray = addaudit.auditArray || "";
          this.startdate = addaudit.startdate || "";
          this.enddate = addaudit.enddate || "";
          this.auditname=addaudit.auditname||"";
          



      }
      
  }
}
  export class Aidaudit{
    auditArraya: string;
    startdatea: string;
    enddatea: string;
    auditnamea: string;
    aidedid:number;
    uploadImg:string;
    FileUploadUtil: string;
    category: string;
    location: string;
    department: string;
    audituser: string;
    aidid:number;
    auditNo:number;
  
    constructor(Aidaudit) {
      {
  
        this.auditArraya = Aidaudit.auditArraya || "";
        this.startdatea = Aidaudit.startdatea || "";
        this.enddatea = Aidaudit.enddatea || "";
        this.auditnamea=Aidaudit.auditnamea||"";
        this.aidedid=Aidaudit.aidedid||"";
        this.uploadImg=Aidaudit.uploadImg||"";
        
        // this.uploadImg=Aidaudit.uploadImg||"";
        this.FileUploadUtil=Aidaudit.FileUploadUtil||"";
  
        this.category = Aidaudit.category || "";
        this.location = Aidaudit.location || "";
        this.department = Aidaudit.department || "";
        this.audituser=Aidaudit.auditnamea||"";
        this.aidid=Aidaudit.aidedid||"";
        this.auditNo=Aidaudit.auditNo||"";
      } 
    }
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
  
  }
  
  export class Details{
  
  
    constructor(details) {
      {
       
        
      }}
  
  
  }
  