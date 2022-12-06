import { formatDate } from "@angular/common";
export class InterCompanyTransferApprove {
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

  constructor(interCompanyTransferApprove) {
    {
      this.employeeId = interCompanyTransferApprove.previousClosedYear ;
      this.tableName = interCompanyTransferApprove.tableName ;
      this.formCode = interCompanyTransferApprove.formCode ;
      this.transferFromName = interCompanyTransferApprove.transferFromName ;
      this.transferToName = interCompanyTransferApprove.transferToName ;
      this.transferFrom = interCompanyTransferApprove.transferFrom ;
      this.transferTo = interCompanyTransferApprove.transferTo ;
      this.payerCode = interCompanyTransferApprove.payerCode ;
      this.status = interCompanyTransferApprove.status ;
      this.transferDate = interCompanyTransferApprove.transferDate ;
      this.amount = interCompanyTransferApprove.amount ;
      this.payerDispute = interCompanyTransferApprove.payerDispute ;
      this.payerDispute = interCompanyTransferApprove.payerDispute ;

    }
  }
}
