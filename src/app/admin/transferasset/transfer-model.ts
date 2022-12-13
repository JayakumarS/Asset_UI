export class TraansferService {
  addCreditFiles<T>(addCreditFiles: any, frmData: FormData) {
    throw new Error('Method not implemented.');
  }
    status:string;
    department:string;
    location:string;
    transfer:string;
    date:string;
    remarks:string;
    files:string
    profitCenter: string;
    constructor(traansferService) {
        {
          this.getRandomID();
          this.status = traansferService.deptCode || "";
          this.department = traansferService.departmentName || "";
          this.location = traansferService.departmentHead || "";
          this.transfer=traansferService.remarks||"";
          this.date=traansferService.isactive||"";
          this.remarks = traansferService.remarks || "";
          this.files = traansferService.deptId || "";
        }
      }
      public getRandomID(): string {
        const S4 = () => {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
      }
    }
    

