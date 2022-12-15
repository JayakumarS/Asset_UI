export class Addaudit{

    auditArray: string;
    startdate: string;
    enddate: string;
    auditname: string;
  id: String;

    constructor(addaudit) {
        {
            this.auditArray = addaudit.auditArray || "";
            this.startdate = addaudit.startdate || "";
            this.enddate = addaudit.enddate || "";
            this.auditname=addaudit.auditname||"";
            



        }
    }


}