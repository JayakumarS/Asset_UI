import { formatDate } from "@angular/common";
export class DepartmentMaster {
  id: number;
  deptCode: string;
  departmentHead: string;
  remarks: string;
  isactive: boolean;
  profitCenter: string;
  deptId:number;
  
  constructor(departmentMaster) {
    {
      this.id = departmentMaster.id || this.getRandomID();
      this.deptCode = departmentMaster.deptCode || "";
      //this.departmentName = departmentMaster.departmentName || "";
      this.departmentHead = departmentMaster.departmentHead || "";
      this.remarks=departmentMaster.remarks||"";
      this.isactive=departmentMaster.isactive||"";
      this.profitCenter = departmentMaster.profitCenter || "";
      this.deptId = departmentMaster.deptId || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
