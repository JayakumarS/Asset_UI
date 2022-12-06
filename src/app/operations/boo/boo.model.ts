
export class BillOfOperation{
    id: number;
    booNo: number;
    bomRef: string;
    productName: string;
    date: string;
    booDetailBean:any;
    idNo:number;
  dataArray: any[];
    constructor(billOfOperation){
        {
            this.id = billOfOperation.id || this.getRandomId();
            this.booNo = billOfOperation.booNo || "";
            this.bomRef = billOfOperation.bomRef || "";
            this.productName = billOfOperation.productName || "";
            this.date = billOfOperation.date || "";
        }
    }
    public getRandomId(): string {
        const S4 = () => {
            return (((1+Math.random()) * 0x10000) | 0).toString(16).substring(1);           
        }
        return S4() + S4();
    }
}