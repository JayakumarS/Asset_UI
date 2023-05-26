export class Otherdebits {
    id:number;
    loginedUser:any;
    loanApplicationDate:string;
    loanApplicationDateObj:string;
    loanApprovalDate:string;
    loanApprovalDateObj:string;
    loanDisbursementDate:string;
    loanDisbursementDateObj:string;
    type:string;
    loanID:string;
    loan:string;
    loanAmount:number;
    loanRef:string;
    loanStartDate:string;
    loanDueDate:string;
    loanStartDateObj:string;
    loanDueDateObj:string;
    amount:number;
    emiDate:string;
    emidateObj:string;
    penalityAmount:number;
    interestRate:string;
    accountNo:number;
    account:string;
    bankname:string;
    loanProperty:string;
    name:string;
    dobObj:string;
    dob:string;
    mail:string;
    phoneno:string;
    telepheNo:string;
    address:string;
    currencyl:string;
    branchName:string;
    ifsccode:string;
    repayment:string;
    loanBal:number;
    payHis:string;


    constructor(Otherdebits) {
        {
          this.id = Otherdebits.id 
          this.loginedUser = Otherdebits.loginedUser || "";
          this.loanApplicationDate = Otherdebits.loanApplicationDate || "";
          this.loanApplicationDateObj = Otherdebits.loanApplicationDateObj || "";
          this.loanApprovalDate = Otherdebits.loanApprovalDate || "";
          this.loanApprovalDateObj = Otherdebits.loanApprovalDateObj || "";
          this.loanDisbursementDate = Otherdebits.loanDisbursementDate || "";
          this.loanDisbursementDateObj = Otherdebits.loanDisbursementDateObj || "";
          this.type = Otherdebits.type || "";
          this.loanID = Otherdebits.loanID || "";
          this.loanAmount = Otherdebits.loanAmount || "";
          this.loanRef = Otherdebits.loanRef || "";
          this.loanStartDate = Otherdebits.loanStartDate || "";
          this.loanDueDate = Otherdebits.loanDueDate || "";
          this.loanStartDateObj = Otherdebits.loanStartDateObj || "";
          this.loanDueDateObj = Otherdebits.loanDueDateObj || "";
          this.amount = Otherdebits.amount || "";
          this.emiDate = Otherdebits.emiDate || "";
          this.emidateObj = Otherdebits.emidateObj || "";
          this.penalityAmount = Otherdebits.penalityAmount || "";
          this.interestRate = Otherdebits.interestRate || "";
          this.accountNo = Otherdebits.accountNo || "";
          this.bankname = Otherdebits.bankname || "";
          this.name = Otherdebits.name || "";
          this.dob = Otherdebits.dob || "";
          this.dobObj = Otherdebits.dobObj || "";
          this.mail = Otherdebits.mail || "";
          this.phoneno = Otherdebits.phoneno || "";
          this.telepheNo = Otherdebits.telepheNo || "";
          this.address = Otherdebits.address || "";
          this.currencyl = Otherdebits.currencyl || "";
          this.branchName = Otherdebits.branchName || "";
          this.ifsccode = Otherdebits.ifsccode || "";
          this.repayment = Otherdebits.repayment || "";
          this.loanBal = Otherdebits.loanBal || "";
          this.payHis = Otherdebits.payHis || "";
            
        }
      }
}

