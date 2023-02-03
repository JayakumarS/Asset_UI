export class PaymentHistoryAuditor {
    receiptNo: string;
    companyName: string;
    noOfUsers: string;
    subAmount: number;
    auditorCommission : number;
    paymentDate : string;
    actualPayment : number;

 
    constructor(paymentHistoryAuditor) {
        {

            this.receiptNo = paymentHistoryAuditor.receiptNo || "";
            this.companyName = paymentHistoryAuditor.companyName ||"";
            this.noOfUsers = paymentHistoryAuditor.noOfUsers || "";
            this.subAmount = paymentHistoryAuditor.subAmount || 0;
            this.auditorCommission = paymentHistoryAuditor.auditorCommission || 0;
            this.paymentDate = paymentHistoryAuditor.paymentDate || "";
            this.actualPayment = paymentHistoryAuditor.actualPayment || 0;
        }
    
    } 
}
