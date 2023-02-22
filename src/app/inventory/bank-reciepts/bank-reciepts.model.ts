export class BankReceipt {

     id:string;
    
     voucherNo: String
    
     companyname: string
	 receiptDate: string
	 receiptDateObj: string
	 chequeno: number
	 chequeDate: string
	 chequeDateObj: string
	 Payment: string
	 bankAccount: number
     currency: string
	 exchangerate: string
	 receivedFrom: string
     TcAmount: number
	 BcAmount: number
	 narration: string
	 lopUpload: string
	
     //detail

     accountname:string;
	 subaccount: string;
	 invoiceno: number;
     currencyno: string
	 exchangerateno: number
	 exchangerateKsh: number
	 TcAmt: number
}