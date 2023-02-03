export class PaymentHistoryAdd {
    receiptNo : string;
    paymentId : string;
    companyName : string;
    companyId : number;
    amountPaidByUser : number;
    auditorCommission : number;
    auditorId : string;
    auditorName : string;
    userId : string;
    currencySymbol : string;

    constructor(paymentHistoryAdd) {
        {
            this.receiptNo = paymentHistoryAdd.receiptNo || "";
            this.paymentId = paymentHistoryAdd.paymentId || "";
            this.companyName = paymentHistoryAdd.companyName || "";
            this.amountPaidByUser = paymentHistoryAdd.amountPaidByUser || 0;
            this.auditorCommission = paymentHistoryAdd.auditorCommission || 0;
            this.companyId = paymentHistoryAdd.companyId || 0;
            this.auditorId = paymentHistoryAdd.auditorId || "";
            this.auditorName = paymentHistoryAdd.auditorName || "";
            this.userId = paymentHistoryAdd.userId || "";
            this.currencySymbol = paymentHistoryAdd.currencySymbol || "";
        }
    }
}
