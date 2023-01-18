
export class PurchaseInvoice{
    purchaseInvoiceDate: string;
    purchaseInvoiceNo: string;
    purchaseInvoiceId: number;
    vendorName: string;
    vendorId: number;
    locationId: number;
    currencyId: number;
    exchangeRate:String;
    amount: number;
    total: string;
    description:string;
    itemIdName:string;
    purchaseInvoiceDetailList:any;
    deliveryOrderDtlList:any;
    Success:boolean;
}