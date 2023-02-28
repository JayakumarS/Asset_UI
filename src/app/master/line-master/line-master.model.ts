export class Line {
    id:any;
    branch:any;
    lineCode:any;
    lineDescription:any;
    companyId:any;
    isactive:any;
    loginedUser:any;
    
    constructor(line) {
        {
          this.id = line.id;
          this.branch = line.branch || "";
          this.lineCode = line.lineCode || "";
          this.lineDescription = line.lineDescription || "";
          this.companyId = line.companyId || "";
          this.isactive = line.isactive || "";
          this.loginedUser = line.loginedUser || "";
        }
      }
}