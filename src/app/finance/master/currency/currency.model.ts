import { formatDate } from "@angular/common";
export class CurrencyMaster {
  currencyCode: string;
  currencyName: string;
  currencyDefault: number;
  currencyFraction: number;
  isActive: string;
  bookCurrency: string;
  fromc: number;
  toc: number;

  constructor(currencyMaster) {
    {
      this.currencyCode = currencyMaster.currencyCode ;
      this.currencyName = currencyMaster.currencyName ;
      this.currencyDefault = currencyMaster.currencyDefault ;
      this.currencyFraction = currencyMaster.currencyFraction ;
      this.isActive = currencyMaster.isActive ;
      this.bookCurrency = currencyMaster.bookCurrency ;
      this.fromc = currencyMaster.fromc ;
      this.toc = currencyMaster.toc ;
    }
  }
}
