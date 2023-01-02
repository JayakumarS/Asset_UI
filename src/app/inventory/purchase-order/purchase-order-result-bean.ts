import { PurchaseOrder } from "./purchase-order-model";

export class PurchaseOrderResultBean {
    Success: boolean;
    purchaseOrder: PurchaseOrder;
    purchaseOrderList: [];
}
