export class PaymentHistoryList {
    paymentCode: string;
    paymentDate: string;
    auditor: string;
    amountPaid: string;

 
    constructor(paymentHistoryList) {
        {

            this.paymentCode = paymentHistoryList.paymentCode || "";
            this.paymentDate=paymentHistoryList.paymentDate ||"";
            this.auditor = paymentHistoryList.auditor ||"";
            this.amountPaid = paymentHistoryList.amountPaid || "";

        }
    
    } 
}
