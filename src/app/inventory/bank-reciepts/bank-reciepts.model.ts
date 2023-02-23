export class BankReceipt {

     id:string;
    
     voucherNo: any;
    
     userCompanyName: string;
	 receiptDate: string;
	 receiptDateObj: string;
	 chequeno: number;
	 chequeDate: string;
	 chequeDateObj: string;
	 payment: string;
	 bankAccount: number;
     currency: string;
	 exchangerate: string;
	 receivedFrom: string;
     TcAmount: number;
	 BcAmount: number;
	 narration: string;
	 lopUpload: string;
	
     //detail

     accountname:string;
	 subaccount: string;
	 invoiceno: number;
     currencyno: string
	 exchangerateno: number
	 exchangerateKsh: number
	 TcAmt: number
	success: any;
	 constructor(bankReceipt){
        {
			this.id = bankReceipt.id || this.getRandomId();

            this.receiptDate = bankReceipt.receiptDate || "";
            this.currency = bankReceipt.currency || "";
            this.chequeno = bankReceipt.chequeno || "";
            this.userCompanyName = bankReceipt.userCompanyName || "";
            this.exchangerate = bankReceipt.exchangerate || "";
            this.chequeDate = bankReceipt.chequeDate || "";
            this.success = bankReceipt.success || "";
        }
	
}
public getRandomId(): string {
	const S4 = () => {
		return (((1+Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return S4() + S4();
  }
}