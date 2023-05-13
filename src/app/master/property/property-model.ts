export class Property {
    
    // propertyHolderName:string;
    // noProperty:number;
    propertyRate:number;
    regDate:string;
    propertyLocation:string;
    taxNo:number;
    mortage:string;
    // type:string;
    // ownership:string;
    depVal:number;
    currentValue:number;
    squareFeet:number;
    loan:string;
    loanNo:string;
    loanInterest:number;
    id:number;
    rentalType:string;
    propertyType:string;


    // residencialType:string;
    // guidelineValue:number;
    // landTaxNo:number;
    // emiDate:string;
    // autoDebit:[false],
    // loanAmount:[""],
    // advance:[""],
    // rentAmount:[""],
    // dateToPayDate:string;
    // rentalPeriod:[""],
    // tenantName:[""],
    // tenentIdCard:[""],
    // mobileNo:[""],
    // alternateNo:[""],
    // payerDate:string;
    // inMonth:[""],
    // payerMode:[""],
    // recive:[""],
    // houseTaxNo:[""],
    // location:[""],
    // area:[""],
    // landSqft:[""],
    // landType:[""],
    // ecAvaliable:[false],
    // regNo:[""],
    // landRegDate:string;
    // source:[""],
    // landGuidelineValue:[""],
    // marketValue:[""],

    // bankName:[""],
    // branchName:[""],
    // ifscCode:[""],
    // acName:[""],
    // acNumber:[""],
    // accountUserId:[""],
    // password:[""],

    // houseName:[""],
    // houseAddress:[""],
    // constructedOn:[""],
    // constructedOnObj:[""],
    // underLoan:[""],
    // floor:[""],
    constructor(PropertyModel) {
        {
         
          // this.propertyHolderName=PropertyModel.propertyHolderName ||"",
          // this.noProperty=PropertyModel.noProperty ||"",
          this.propertyRate=PropertyModel.propertyRate ||"",
          this.regDate=PropertyModel.regDate ||"",
          this.propertyLocation=PropertyModel.propertyLocation ||"",
          this.taxNo=PropertyModel.taxNo ||"",
          this.mortage=PropertyModel.mortage ||""
          // this.type=PropertyModel.type ||""
          // this.ownership=PropertyModel.ownership ||""
          this.depVal=PropertyModel.depVal ||""
          this.currentValue=PropertyModel.currentValue ||""
          this.squareFeet=PropertyModel.squareFeet ||""
          this.loan=PropertyModel.loan ||""
          this.loanNo=PropertyModel.loanNo ||""
          this.loanInterest=PropertyModel.loanInterest ||""
          

        }
      }
}