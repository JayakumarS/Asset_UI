export class PurchaseOrder {
    purchaseOrderId: number;
    poNo: string;
    purchaseFor: string;
    poDate: string;
    purchaseType: string;
    purchaseTypeName: string;
    vendorId: number;
    vendorName: string;
    vendorAddress: string;
    vendorCity: string;
    vendorState: string;
    vendorCountry: string;
    destinationLocation: string;
    termsConditions: string;
    remarks: string;
    paymentTerms: string;
    currency: number;

    //After detail row
    subTotal: number;
    discount: number;
    otherCharges: string;
    total: number;
    lopFile: string;
    lopUpload: string;
    loginedUser: string;

    //purchase Order Detail List
    purchaseOrderDetail: any;

}
