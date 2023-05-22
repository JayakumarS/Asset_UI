export class FdReport{
    investmentTerm:any;
    fixeddeposittype:any;
    currency:any;
    autoRenewal:any;
    frequency:any;

     // Checkboxes Beans
     fdNameCheckbox:boolean;
     mailCheckBox:boolean;
     fdRefCheckBox:boolean;
     typeCheckBox:boolean;
     fixeddeposittypeCheckBox:boolean;
     fdaccountNoCheckbox:boolean;
     dueAmountCheckBox:boolean;
     fdstartDateCheckBox:boolean;
     fdendDateCheckBox: boolean;
     currencyCheckbox:boolean;
     penaltyAmtCheckBox:boolean;
     investmentTermCheckBox:boolean;
     interestCheckBox:boolean;
     bankNameCheckbox: boolean;
     ifsccodeCheckBox:boolean;
     autoRenewalCheckBox: boolean;
     fdExcelHistoryHeader:any;
     
constructor(fdReport) {
    {
        this.getRandomID();
        this.investmentTerm = fdReport.investmentTerm || "";
        this.fixeddeposittype = fdReport.fixeddeposittype || "";
        this.currency = fdReport.currency || "";
        this.autoRenewal = fdReport.autoRenewal || "";
        this.frequency = fdReport.frequency || "";
        this.fdNameCheckbox = fdReport.fdNameCheckbox || "";
        this.mailCheckBox = fdReport.mailCheckBox || "";
        this.fdRefCheckBox = fdReport.fdRefCheckBox || "";
        this.typeCheckBox = fdReport.typeCheckBox || "";
        this.fixeddeposittypeCheckBox = fdReport.fixeddeposittypeCheckBox || "";
        this.fdaccountNoCheckbox = fdReport.fdaccountNoCheckbox || "";
        this.dueAmountCheckBox = fdReport.dueAmountCheckBox || "";
        this.fdstartDateCheckBox = fdReport.fdstartDateCheckBox || "";
        this.fdendDateCheckBox = fdReport.fdendDateCheckBox || "";
        this.currencyCheckbox = fdReport.currencyCheckbox || "";
        this.penaltyAmtCheckBox = fdReport.penaltyAmtCheckBox || "";
        this.investmentTermCheckBox = fdReport.investmentTermCheckBox || "";
        this.bankNameCheckbox = fdReport.bankNameCheckbox || "";
        this.ifsccodeCheckBox = fdReport.ifsccodeCheckBox || "";
        this.autoRenewalCheckBox = fdReport.autoRenewalCheckBox || "";
        this.fdExcelHistoryHeader = fdReport.fdExcelHistoryHeader || "";
    }
}

public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }

}


