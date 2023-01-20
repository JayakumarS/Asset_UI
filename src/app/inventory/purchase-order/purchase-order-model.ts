export class PurchaseOrder {
    purchaseOrderId: number;
    poNo: string;
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

    //After detail row
    subTotal: string;
    discount: string;
    otherCharges: string;
    total: string;
    lopFile: string;
    lopUpload: string;
    loginedUser: string;

    //purchase Order Detail List
    purchaseOrderDetail: any;

}
