export class Receivablesreport{
  assettype:any;
  debtorsname:any;
  currency:any;
  accounttype:any;
  paymentstatus:any;
  paymentreference:any;

   //checkbox beans
   assetTypeCheckBox:boolean;
  debtorsnameCheckBox:boolean;
  invoiceNumberCheckBox:boolean;
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
  
  receivablesExcelHistoryHeader:any;

 

    constructor(receivablesreport) {
      {
        this.getRandomID();
        this.assettype = receivablesreport.assettype || "";
        this.debtorsname = receivablesreport.debtorsname || "";
        this.currency = receivablesreport.currency || "";
        this.accounttype = receivablesreport.accounttype || "";
        this.paymentstatus = receivablesreport.paymentstatus || "";
        this.paymentreference = receivablesreport.paymentreference || "";
        this.duedateCheckBox = receivablesreport.duedateCheckBox || "";


        this.assetTypeCheckBox = receivablesreport.assetTypeCheckBox || "";
        this.invoiceNumberCheckBox = receivablesreport.invoiceNumberCheckBox || "";
        this.invoicedateCheckBox = receivablesreport.invoicedateCheckBox || "";
        this.modeofpaymentCheckBox = receivablesreport.modeofpaymentCheckBox || "";
        this.debtorsnameCheckBox = receivablesreport.debtorsnameCheckBox || "";
        this.amountCheckBox = receivablesreport.amountCheckBox || "";
        this.currencyCheckBox = receivablesreport.currencyCheckBox || "";
        this.baddebtsCheckBox = receivablesreport.baddebtsCheckBox || "";
        this.interestreceivableCheckBox = receivablesreport.interestreceivableCheckBox || "";
        this.accounttypeCheckBox = receivablesreport.accounttypeCheckBox || "";
        this.paymentstatusCheckBox = receivablesreport.paymentstatusCheckBox || "";
        this.paymentreferenceCheckBox = receivablesreport.paymentreferenceCheckBox || "";

    }
}

public getRandomID(): string {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4();
}
}