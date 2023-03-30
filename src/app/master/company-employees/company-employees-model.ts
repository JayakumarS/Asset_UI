export class Company{

    company:string;
    branch:string;
    fullName:string;
    phoneno:string;
    emailId:string;
    department:string;
    active:any;
    id:any;
    employeeId:string;
    
  Success: boolean;
  empid:any;
  

  constructor(company) {
    {
      this.company = company.company ||"";
      this.branch = company.branch || "";
      this.fullName = company.fullName || "";
      this.phoneno = company.phoneno || "";
      this.emailId = company.emailId || "";
      this.department = company.department || "";
      this.active = company.active || "";
      this.id = company.id || "";
    }
  }
}
