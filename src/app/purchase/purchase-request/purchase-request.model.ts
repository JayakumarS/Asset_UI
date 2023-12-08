export class PurchaseRequest {
    requisitionId: number;
    id : number;
    company: string;
    requestType: number;
    requestDate: string;
    sourceLocation: number;
    destinationLocation: number;
    jobTitle: string;
    requestedBy: string;
    prReqNo: string;
    costCenter: string;

    purchaseRequestId: number;
    prNo: string;
    requestTypeName: string;
    vendorId: number;
    vendorName: string;
    remarks:any;

    constructor(purchaseRequest) {
      {
        this.id = purchaseRequest.id || this.getRandomID();
        this.requisitionId = purchaseRequest.requisitionId || "";
        this.company = purchaseRequest.company || "";
        this.requestType = purchaseRequest.requestType || ""; 
        this.requestDate = purchaseRequest.requestDate || ""; 
        this.sourceLocation = purchaseRequest.sourceLocation || ""; 
        this.destinationLocation = purchaseRequest.destinationLocation || ""; 
        this.jobTitle = purchaseRequest.jobTitle || ""; 
        this.requestedBy = purchaseRequest.requestedBy || ""; 
        this.prReqNo = purchaseRequest.prReqNo || ""; 
        this.costCenter = purchaseRequest.costCenter || ""; 

      }
    }
    public getRandomID(): string {
        const S4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

        };
        return S4() + S4();
    }
}
