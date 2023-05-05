export class Otherdebits {
    id:number;
    loginedUser:any;
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
    interestRate:number;
    accountNo:number;
    account:string;
    bankname:string;
    


    constructor(Otherdebits) {
        {
          this.id = Otherdebits.id 
          this.loginedUser = Otherdebits.loginedUser || "";
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
        }
      }
}

