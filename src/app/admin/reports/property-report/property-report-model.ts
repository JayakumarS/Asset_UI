export class PropertyReport{
    
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
  

    constructor(propertyreport) {
        {this.getRandomID();
            this.assettype = propertyreport.assettype || "";
            this.debtorsname = propertyreport.debtorsname || "";
            this.currency = propertyreport.currency || "";
            this.accounttype = propertyreport.accounttype || "";
            this.paymentstatus = propertyreport.paymentstatus || "";
            this.paymentreference = propertyreport.paymentreference || "";
            this.duedateCheckBox = propertyreport.duedateCheckBox || "";
    
    
            this.assetTypeCheckBox = propertyreport.assetTypeCheckBox || "";
            this.invoiceNumberCheckBox = propertyreport.invoiceNumberCheckBox || "";
            this.invoicedateCheckBox = propertyreport.invoicedateCheckBox || "";
            this.modeofpaymentCheckBox = propertyreport.modeofpaymentCheckBox || "";
            this.debtorsnameCheckBox = propertyreport.debtorsnameCheckBox || "";
            this.amountCheckBox = propertyreport.amountCheckBox || "";
            this.currencyCheckBox = propertyreport.currencyCheckBox || "";
            this.baddebtsCheckBox = propertyreport.baddebtsCheckBox || "";
            this.interestreceivableCheckBox = propertyreport.interestreceivableCheckBox || "";
            this.accounttypeCheckBox = propertyreport.accounttypeCheckBox || "";
            this.paymentstatusCheckBox = propertyreport.paymentstatusCheckBox || "";
            this.paymentreferenceCheckBox = propertyreport.paymentreferenceCheckBox || "";
    
        }
    }
    
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
    }