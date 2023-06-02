export class MutualfundReport{
    
    fundType:String;
    modeOfInvestment:String;
    investmentMethod:String;
    paymentMethod:String;


    policyTermCheckBox: boolean;
    policyNumberCheckbox: boolean;
    investmentexperienceCheckBox: boolean;
    plannameCheckBox:boolean;
    nameCheckbox: boolean;
    modeOfInvestmentCheckBox: boolean;
    mutualfundExcelHeader: any;
    grossPremiumCheckBox:boolean;
    brokerNameCheckBox:boolean;

    constructor(mutualfundreport) {
        {
            this.fundType = mutualfundreport.fundType|| "";
            this.modeOfInvestment = mutualfundreport.modeOfInvestment|| "";
            this.investmentMethod=mutualfundreport.investmentMethod || "";
            this.paymentMethod=mutualfundreport.paymentMethod || ""; 

            this.nameCheckbox=mutualfundreport.nameCheckbox || ""; 
            this.investmentexperienceCheckBox=mutualfundreport.investmentexperienceCheckBox || ""; 
            this.plannameCheckBox=mutualfundreport.plannameCheckBox || ""; 
            this.brokerNameCheckBox=mutualfundreport.brokerNameCheckBox || ""; 
            this.policyTermCheckBox=mutualfundreport.policyTermCheckBox || ""; 
            this.policyNumberCheckbox=mutualfundreport.policyNumberCheckbox || ""; 
            this.modeOfInvestmentCheckBox=mutualfundreport.modeOfInvestmentCheckBox || ""; 
            this.grossPremiumCheckBox=mutualfundreport.grossPremiumCheckBox || ""; 


        }
}
}