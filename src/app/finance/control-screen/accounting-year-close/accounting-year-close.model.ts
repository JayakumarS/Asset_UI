import { formatDate } from "@angular/common";
export class AccountingYearClose {
  previousClosedYear: string;
  yearToBeClosed: string;
  location: string;
  fromdate: string;
  todate: string;
  companyCode: string;

  constructor(accountingYearClose) {
    {
      this.previousClosedYear = accountingYearClose.previousClosedYear ;
      this.yearToBeClosed = accountingYearClose.yearToBeClosed ;
      this.location = accountingYearClose.location ;
      this.fromdate = accountingYearClose.fromdate ;
      this.todate = accountingYearClose.todate ;
      this.companyCode = accountingYearClose.companyCode ;
    }
  }
}
