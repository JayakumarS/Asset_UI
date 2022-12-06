export class Lop {
    id : number;
    purchaseOrderNo: string;
    requestType: string;
    vendor: string;
    purchaseOrderDate: string;
    type: string;
    status: string;

    constructor(lop) {
        {
            this.id = lop.id || this.getRandomID();
            this.purchaseOrderNo = lop.purchaseOrderNo || "";
            this.requestType = lop.requestType || ""; 
            this.vendor = lop.vendor || ""; 
            this.purchaseOrderDate = lop.purchaseOrderDate || ""; 
            this.type = lop.type || ""; 
            this.status = lop.status || ""; 

        }
    }
    public getRandomID(): string {
        const S4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

        };
        return S4() + S4();
    }
}
