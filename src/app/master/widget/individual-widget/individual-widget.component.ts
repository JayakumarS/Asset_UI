import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ListPropertyComponent } from '../../property/list-property/list-property.component';
import { ListVehicleComponent } from '../../vehicle/list-vehicle/list-vehicle.component';
import { ListJewelleryDetailsComponent } from '../../jewellery/list-jewellery-details/list-jewellery-details.component';
import { ListFixedDepositComponent } from '../../Fixed-deposit/list-fixed-deposit/list-fixed-deposit.component';
import { ListFundComponent } from '../../mutualfund/list-fund/list-fund.component';
import { ListOtherdebitsComponent } from '../../loan-otherdebits/list-otherdebits/list-otherdebits.component';
import { ListReceivablesComponent } from '../../loan-receivables/list-receivables/list-receivables.component';

@Component({
  selector: 'app-individual-widget',
  templateUrl: './individual-widget.component.html',
  styleUrls: ['./individual-widget.component.sass']
})
export class IndividualWidgetComponent implements OnInit {

  @ViewChild('matgroup') tabGroup:MatTabGroup;

  tabProp = [{ content: ListPropertyComponent }];
  tabVeh = [{ content: ListVehicleComponent}];
  tabJewel = [{ content: ListJewelleryDetailsComponent }];
  tabFixe = [{ content: ListFixedDepositComponent}];
  tabMutual = [{ content: ListFundComponent }];
  tabLoan = [{ content: ListOtherdebitsComponent}];
  tabReceive = [{ content: ListReceivablesComponent }];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.matEvent(window.sessionStorage.getItem("TabFromInd"));

  }

  selectNext(el){
    el.selectedIndex += 1;
    window.sessionStorage.setItem("TabFromInd",el.selectedIndex);
  }

  matEvent(row){
    this.tabGroup.selectedIndex=row;
    window.sessionStorage.setItem("TabFromInd",row);
    }

}
