export class expenese {

    id:any;
    loginedUser:any;

    expensescash:any;
    income:any;
    date:string;
    cashinout:string;
    time:string;
    category:string;
    detail:string;
    amount:any;
    currency:string;
   
    dateObj:string;
    paymentMethod:string;
    balance:any;
    constructor(expenese) {
        {
            this.loginedUser = expenese.loginedUser || "";
            this.id = expenese.id || this.getRandomID();
            this.amount = expenese.amount|| "";
            this.detail = expenese.detail|| "";
            this.date = expenese.date|| "";
            this.dateObj = expenese.dateObj|| "";
            this.currency = expenese.currency|| "";
            this.category = expenese.category|| "";
            this.paymentMethod = expenese.paymentMethod|| "";
            this.balance = expenese.balance|| "";
            this.expensescash = expenese.expensescash|| "";
            this.income = expenese.income|| "";
            

            


        }
      }
      public getRandomID(): string {
        const S4 = () => {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
      }
}