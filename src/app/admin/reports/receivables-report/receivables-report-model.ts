export class Receivablesreport{
  assettype:any;
  debtorsname:any;
  currency:any;
  accounttype:any;
  paymentstatus:any;
 paymentreference:any;
 ReceivableReportHeader:any;
   //checkbox beans
  assettypeCheckBox:boolean;
  debtorsnameCheckBox:boolean;
  invoicenumberCheckBox:boolean;
  invoicedateCheckBox:boolean;
  modeofpaymentCheckBox:boolean;
  amountCheckBox:boolean;
  currencyCheckBox:boolean;
  baddebtsCheckBox:boolean;
  interestreceivableCheckBox:boolean;
  accounttypeCheckBox:boolean;
  paymentstatusCheckBox:boolean;
  duedateCheckBox:boolean;
  paymentreferenceCheckBox:boolean;
  
 

    constructor(receivablesreport) {
      {
        this.getRandomID();
        this.assettype = receivablesreport.assettype || "";
        this.debtorsname = receivablesreport.debtorsname || "";
        this.invoicenumberCheckBox = receivablesreport.invoicenumberCheckBox || "";
        this.invoicedateCheckBox = receivablesreport.invoicedateCheckBox || "";
        this.modeofpaymentCheckBox = receivablesreport.modeofpaymentCheckBox || "";
        this.currency = receivablesreport.currency || "";
        this.baddebtsCheckBox = receivablesreport.baddebtsCheckBox || "";
        this.interestreceivableCheckBox = receivablesreport.interestreceivableCheckBox || "";
        this.accounttype = receivablesreport.accounttype || "";
        this.paymentstatus = receivablesreport.paymentstatus || "";
        this.duedateCheckBox = receivablesreport.duedateCheckBox || "";
        this.paymentreference = receivablesreport.paymentreference || "";
        
    }
}

public getRandomID(): string {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4();
}
}