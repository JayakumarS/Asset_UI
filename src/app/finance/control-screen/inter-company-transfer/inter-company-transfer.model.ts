import { formatDate } from "@angular/common";
export class InterCompanyTransfer {
  employeeId: string;
  tableName: string;
  formCode: string;
  transferFromName: string;
  transferToName: string;
  transferFrom: string;
  transferTo: string;
  payerCode: string;
  status: string;
  transferDate: string;
  amount: number;
  payerDispute: number;
  interCompanyPettyCashId: number;

  constructor(interCompanyTransfer) {
    {
      this.employeeId = interCompanyTransfer.previousClosedYear ;
      this.tableName = interCompanyTransfer.tableName ;
      this.formCode = interCompanyTransfer.formCode ;
      this.transferFromName = interCompanyTransfer.transferFromName ;
      this.transferToName = interCompanyTransfer.transferToName ;
      this.transferFrom = interCompanyTransfer.transferFrom ;
      this.transferTo = interCompanyTransfer.transferTo ;
      this.payerCode = interCompanyTransfer.payerCode ;
      this.status = interCompanyTransfer.status ;
      this.transferDate = interCompanyTransfer.transferDate ;
      this.amount = interCompanyTransfer.amount ;
      this.payerDispute = interCompanyTransfer.payerDispute ;
      this.payerDispute = interCompanyTransfer.payerDispute ;

    }
  }
}
