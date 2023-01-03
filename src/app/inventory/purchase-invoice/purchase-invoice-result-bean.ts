import { PurchaseInvoice } from "./purchase-invoice.model";

export class PurchaseInvoiceResultBean{
    success: boolean;
    purchaseInvoiceList: [];
    purchaseInvoiceDetailList: []; 
    purchaseInvoice: PurchaseInvoice;
}