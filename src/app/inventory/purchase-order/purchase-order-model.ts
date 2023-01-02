export class PurchaseOrder {
    id: number;
    purchaseOrderId: number;
    requisitionNo: number;
    organizationName: string;
    poNo: string;
    requestType: string;
    poDate: string;
    woType: string;
    purchaseType: string;
    purchaseFor: string;
    vendorId: number;
    vendorName: string;
    destinationLocation: string;
    advance: number;
    currency: string;
    termsConditions: string;
    remarks: string;
    paymentTerms: string;
    vendorAddress: string;
    vendorCity: string;
    vendorState: string;
    vendorZip: number;
    vendorCountry: string;
    destinationAddress: string;
    destinationCity: string;
    destinationState: string;
    destinationZip: number;
    destinationCountry: string;
    subTotal: number;
    discount: number;
    cgst: number;
    sgst: number;
    igst: number;
    freight: number;
    freightTaxPercent: number;
    freightTotal: number;
    otherCharges: string;
    remarksOtherCharges: string;
    total: number;
    purchaseOrderDetail: any;
    address: string;
    city: string;
    state: string;
    zip: number;
    country: string;
    success: boolean;
    lopFile: string;
    lopUpload: string;
    purchaseTypeName: String;
    purchaseForName: String;
}
