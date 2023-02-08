import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import {FeatherIconsModule} from 'src/app/shared/feather-icons.module';
import { UOMCategoryModule } from './uom-category/uom-category.module';
import { ItemMasterModule } from './item-master/item-master.module';
import { ItemPropertiesModule } from './item-properties/item-properties.module';
import { WarehousePositioningModule } from './warehouse-positioning/warehouse-positioning.module';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    FeatherIconsModule,
    UOMCategoryModule,
    ItemMasterModule,
    ItemPropertiesModule,
    WarehousePositioningModule,
    MatTabsModule
  ]
})
export class InventoryModule { }
