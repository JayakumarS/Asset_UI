export class Loan {

    id:any;
    customername:string;
    amount:number;
    invoicenumber:number;
    paymentreference:string;
    baddebts:number;
    interestreceivable:number;
    accounttype:string;
    paymentstatus:string;
    currency:number;
    duedate:string;
    duedateObj:string;
    UserId:string;

    constructor(loan) {
        {
            this.id = loan.id;
          this.customername = loan.customername || "";
          this.amount = loan.amount || "";
          this.invoicenumber = loan.invoicenumber || "";
          this.paymentreference = loan.paymentreference|| "";
          this.baddebts = loan.baddebts || "";
          this.interestreceivable = loan.interestreceivable || "";
          
        }
      }
}