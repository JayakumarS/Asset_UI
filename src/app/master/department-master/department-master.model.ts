import { formatDate } from "@angular/common";
export class DepartmentMaster {
  id: number;
  deptCode: string;
  departmentName: string;
  departmentHead: string;
  profitCenter: string;

  
  constructor(departmentMaster) {
    {
      this.id = departmentMaster.id || this.getRandomID();
      this.deptCode = departmentMaster.deptCode || "";
      this.departmentName = departmentMaster.departmentName || "";
      this.departmentHead = departmentMaster.departmentHead || "";
      this.profitCenter = departmentMaster.profitCenter || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
