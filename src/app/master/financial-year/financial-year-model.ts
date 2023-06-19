export class FinancialYear {
    financialyear: string;
    description: string;
    isactive: string;
    companyId: string;
    userId: string;
    id: number;
    constructor(financialyear) {
        this.financialyear=financialyear.financialyear||"";
        this.isactive=financialyear.isactive||"";
        this.description = financialyear.description || "";
        this.id = financialyear.id || "";

    }
}