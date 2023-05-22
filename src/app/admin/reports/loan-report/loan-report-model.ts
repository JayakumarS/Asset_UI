export class Loanreport{
    id:any;
    loanRef:any;
    type:any;
    currencyl:any;
    bankname:any;
    ifsccode:any;

     // Checkboxes beans
     nameCheckbox: boolean;
     mailCheckBox: boolean;
     loanRefCheckBox: boolean;
     typeCheckBox: boolean;
     loannoCheckbox: boolean;
     loanAmountCheckBox: boolean;
     loanStartDateCheckBox: boolean;
     loanDueDateCheckBox: boolean;
     currencylCheckbox: boolean;
     amountCheckBox: boolean;
     emiDateCheckBox: boolean;
     interestRateCheckBox: boolean;
     banknameCheckbox: boolean;
     accountCheckBox: boolean;
     ifsccodeCheckBox: boolean;
     loanExcelHistoryHeader:any;


    constructor(loanreport) {
        this.id = loanreport.id || "";
        this.loanRef = loanreport.loanRef || "";
        this.type = loanreport.type || "";
        this.currencyl = loanreport.currencyl || "";
        this.bankname = loanreport.bankname || "";
        this.ifsccode = loanreport.ifsccode || "";

        this.nameCheckbox = loanreport.nameCheckbox || "";
        this.mailCheckBox = loanreport.mailCheckBox || "";
        this.loanRefCheckBox = loanreport.loanRefCheckBox || "";
        this.loannoCheckbox = loanreport.loannoCheckbox || "";
        this.loanAmountCheckBox = loanreport.loanAmountCheckBox || "";
        this.loanStartDateCheckBox = loanreport.loanStartDateCheckBox || "";
        this.loanDueDateCheckBox = loanreport.loanDueDateCheckBox || "";
        this.currencylCheckbox = loanreport.currencylCheckbox || "";
        this.amountCheckBox = loanreport.amountCheckBox || "";
        this.emiDateCheckBox = loanreport.emiDateCheckBox || "";
        this.interestRateCheckBox = loanreport.interestRateCheckBox || "";
        this.banknameCheckbox = loanreport.banknameCheckbox || "";
        this.accountCheckBox = loanreport.accountCheckBox || "";
        this.ifsccodeCheckBox = loanreport.ifsccodeCheckBox || "";
    }

}
