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
    public getRandomID(): string {
        const S4 = () => {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
      }

}