import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.sass']
})
export class SubscriptionPageComponent implements OnInit {
  
  currencyList = [
    {id: 'INR', text: 'INR'},
    {id: 'USD', text: 'USD'},
    {id: 'AED', text: 'AED'},
    {id: 'MYR', text: 'MYR'},
    {id: 'SGD', text: 'SGD'},
  ];
  stdAmt:string;
  busAmt:string;
  preAmt:string;
  extAmt:string;
  docForm:FormGroup;
  constructor(private fb: FormBuilder) { 
    
    this.docForm = this.fb.group({
      currency:["INR"],
    });
    this.stdAmt = "₹500";
      this.busAmt = "₹1000";
      this.preAmt = "₹5000";
      this.extAmt = "₹10000";
  }

  ngOnInit(): void {
  }

  changeCurrency(currency){

    alert(this.docForm.get("currency").value);

    if(currency=="INR"){
      this.stdAmt = "₹500";
      this.busAmt = "₹1000";
      this.preAmt = "₹5000";
      this.extAmt = "₹10000";
    }else if(currency=="USD"){
      this.stdAmt = "$10";
      this.busAmt = "$100";
      this.preAmt = "$200";
      this.extAmt = "$1000";
    }else if(currency=="AED"){
      this.stdAmt = "AED 10";
      this.busAmt = "AED 400";
      this.preAmt = "AED 800";
      this.extAmt = "AED 3800";
    }else if(currency=="MYR"){
      this.stdAmt = "RM10";
      this.busAmt = "RM400";
      this.preAmt = "RM800";
      this.extAmt = "RM3800";
    }else if(currency=="SGD"){
      this.stdAmt = "S$10";
      this.busAmt = "S$120";
      this.preAmt = "S$240";
      this.extAmt = "S$1200";
    }
  }

  initiatePaymentModule(type){
    
    let pay ={
      amount:0,
      currency:'INR',
      receipt:'TALENTCHEK',
      exAmount:0,
  }
  

    
      if(type =='standard'){
        pay.amount = 10000;
      }
      else if(type=='Professional'){
        pay.amount = 499900;
      }
      else if(type=='Enterprice'){
        pay.amount = 999900;
      }
      else if(type=='Ultimate'){
        pay.amount = 7499900;
      }
 
 
 pay ={
      amount:0,
      currency:'USD',
      receipt:'TALENTCHEK',exAmount:0,
  }
  

    
      if(type =='standard'){
        pay.amount = 1000;
      }
      else if(type=='Professional'){
        pay.amount = 10000;
      }
      else if(type=='Enterprice'){
        pay.amount = 20000;
      }
      else if(type=='Ultimate'){
        pay.amount = 100000;
      }
 
 pay ={
      amount:0,
      currency:'AED',
      receipt:'TALENTCHEK',exAmount:0,
  }
  

    
      if(type =='standard'){
        pay.amount = 1000;
      }
      else if(type=='Professional'){
       pay.amount = 40000;
      }
      else if(type=='Enterprice'){
        pay.amount = 80000;
      }
      else if(type=='Ultimate'){
        pay.amount = 380000;
      }
 
 
 pay ={
      amount:0,
      currency:'MYR',
      receipt:'TALENTCHEK',exAmount:0,
  }
  

    
      if(type =='standard'){
        pay.amount = 1000;
      }
      else if(type=='Professional'){
        pay.amount = 40000;
      }
      else if(type=='Enterprice'){
        pay.amount = 80000;
      }
      else if(type=='Ultimate'){
        pay.amount = 380000;
      }
 
 
  pay ={
      amount:0,
      currency:'SGD',
      receipt:'TALENTCHEK',
      exAmount:0,
  }
  

    
      if(type =='standard'){
        pay.amount = 1000;
      }
      else if(type=='Professional'){
        pay.amount = 12000;
      }
      else if(type=='Enterprice'){
        pay.amount = 24000;
      }
      else if(type=='Ultimate'){
        pay.amount = 120000;
      }
      
 
 pay.currency = this.docForm.get("currency").value; 
 pay.receipt = 'TALENTCHEK';
 
 if(type =='standard'){
   if(this.docForm.get("currency").value =='INR'){
     pay.amount = 100 *100;
     pay.exAmount = 100;
    }else if (this.docForm.get("currency").value =='USD'){
      pay.amount = 1000;
      pay.exAmount =1000;
    }else if (this.docForm.get("currency").value == 'AED'){
      pay.amount = 1000;
      pay.exAmount = 1000;
    }else if (this.docForm.get("currency").value == 'MYR'){
      pay.amount = 1000;
      pay.exAmount = 1000;
    }else if (this.docForm.get("currency").value == 'SGD'){
      pay.amount = 1000;
      pay.exAmount = 1000;
    }
 }
   else if(type=='Professional'){
     if(this.docForm.get("currency").value =='INR'){
     pay.amount = 4999*100;
     pay.exAmount=  4999;
    }else if (this.docForm.get("currency").value =='USD'){
      pay.amount = 100*100;
       pay.exAmount=  100;
    }else if (this.docForm.get("currency").value == 'AED'){
      pay.amount = 40000;
      pay.exAmount=  40000;
    }else if (this.docForm.get("currency").value == 'MYR'){
      pay.amount = 40000;
      pay.exAmount=  40000;
    }else if (this.docForm.get("currency").value == 'SGD'){
      pay.amount = 12000;
      pay.exAmount=  12000;
    }
   }
   else if(type=='Enterprice'){
     if(this.docForm.get("currency").value =='INR'){
     pay.amount = 9999*100;
     pay.exAmount=9999;
    }else if (this.docForm.get("currency").value =='USD'){
      pay.amount = 20000;
      pay.exAmount= 20000;
    }else if (this.docForm.get("currency").value == 'AED'){
      pay.amount = 80000;
      pay.exAmount=  80000;
    }else if (this.docForm.get("currency").value == 'MYR'){
      pay.amount = 80000;
      pay.exAmount= 80000;
    }else if (this.docForm.get("currency").value == 'SGD'){
      pay.amount =  24000;
      pay.exAmount= 24000;
    }
   }
   else if(type=='Ultimate'){
     if(this.docForm.get("currency").value =='INR'){
     pay.amount = 74999*100;
     pay.exAmount= 74999;
    }else if (this.docForm.get("currency").value =='USD'){
      pay.amount =  100000;
      pay.exAmount= 100000;
    }else if (this.docForm.get("currency").value == 'AED'){
      pay.amount = 380000;
      pay.exAmount= 380000;
    }else if (this.docForm.get("currency").value == 'MYR'){
      pay.amount = 380000;
      pay.exAmount=380000;
    }else if (this.docForm.get("currency").value == 'SGD'){
      pay.amount = 120000;
      pay.exAmount= 120000;
    }
   }
 
  }
}
