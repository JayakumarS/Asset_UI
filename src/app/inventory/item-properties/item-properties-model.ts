
export class ItemProperties{
    itemPropertyId: any;
    propertyType: any;
    type: any;
    propertyName: any;
    length: any;
    value: any;
    defaultValue: any;
    text: any;
    typeName : any;
    active: boolean;

    constructor(itemProperties){
        {
        this.itemPropertyId = itemProperties.itemPropertyId ||"";
        this.propertyType = itemProperties.propertyType || "";
        this.type = itemProperties.type || "";
        this.propertyName = itemProperties.propertyName || "";
        this.length = itemProperties.length || "";
        this.value = itemProperties.value || "";
        this.defaultValue = itemProperties.defaultValue || "";
        this.text = itemProperties.text || "";
        this.active = itemProperties.active || "";
        this.typeName = itemProperties.typeName || "";
        
        }
    }

    public getRandomId(): string {
        const S4 = () => {
            return (((1+Math.random()) * 0x10000) | 0).toString(16).substring(1);           
        }
        return S4() + S4();
    }
}