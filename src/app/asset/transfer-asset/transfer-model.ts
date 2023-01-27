export class TransferBean {

    tid:number;
    status:string;
    department:string;
    location:string;
    transfer:string;
    date:string;
    remarks:string;
    files:string;
    profitCenter: string;
    addCreditFiles: string;
    asset_code:number;
    asset_name:string;
    condition:string;
    asset_location:string;
    departments:string;
    asset_Code:string;
    asset:number;
    code:number;

    transferDate: string;
    transferDateObj: string;
    requisitionNumber: string;
    requisitionNo: string;
    transportationType: string;
    requisitionDate: string;
    sourceLocation: string;
    requestedBy: string;
    destinationLocation: string;
    deliveryMethod: string;
    hospital: string;
    branchId: any;
    itemName: string;
    itemCategory: string;
    requestedQuantity: string;
    eddDate: string;
    transferQuantity: string;
    addAssetDetail:[];
    statusName:string;
    constructor(traansferService) {
        {
          this.getRandomID();
          this.status = traansferService.status || "";
          this.department = traansferService.department || "";
          this.location = traansferService.location || "";
          this.transfer=traansferService.transfer||"";
          this.date=traansferService.date||"";
          this.remarks = traansferService.remarks || "";
          this.files = traansferService.files || "";
          this.files = traansferService.files || "";
          this.asset_code = traansferService.asset_code || "";
          this.asset_name = traansferService.asset_name || "";
          this.asset_code = traansferService.asset_code || "";
          this.condition = traansferService.condition || "";
          this.asset_location = traansferService.asset_location || "";
          this.departments = traansferService.departments  ||"";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
          this.asset = traansferService.asset||"";    
          this.code =  traansferService.code||"";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  
        }
      }
      public getRandomID(): string {
        const S4 = () => {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
      }
    }
    
  
  