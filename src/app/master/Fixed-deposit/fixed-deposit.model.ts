export class Deposit {


    loginedUser:string;
    bankName:string;
    investmentTerm:string;
    autoRenewal:string;
    id:number;
    dueAmount:number;
    fdendDate:string;
    fixeddeposittype:string;
    fdstartDate:string;
    fdRef:string;
    fdamt:number;
    penalityAmt:number;
    ifscCode:String;
    fdaccountNo:number;
    interest :String;
    applicationNo:any
    fdName:any;

       
    constructor(Deposit) {
        {  this.id = Deposit.id;
            this.loginedUser = Deposit.loginedUser || "";
           
            this.bankName = Deposit.bankName || "";
           
            
            this.investmentTerm = Deposit.investmentTearm || "";
            this.autoRenewal = Deposit.autoRenewalr || "";
           
            this.fdendDate = Deposit.fdendDate || "";
            this.fdstartDate = Deposit.fdstartDate || "";
            this.fdRef = Deposit.fdRef || "";
            this.fixeddeposittype = Deposit.fixeddeposittype || "";
           
        }
    }
}

