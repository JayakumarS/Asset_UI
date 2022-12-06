import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "item-master",
    loadChildren: () =>
      import("./item-master/item-master.module").then((m) => m.ItemMasterModule),
  },
  {
    path:"UOM-catagory",
    loadChildren:()=>
      import("./uom-category/uom-category.module").then((m) =>m.UOMCategoryModule),
  },
  {
    path:"manage-UOM",

    loadChildren:()=>
      import("./manage-uom/manage-uom.module").then((m) =>m.ManageUOMModule),
  },
  {
    path:"item-properties",
    loadChildren:()=>
      import("./item-properties/item-properties.module").then((m) =>m.ItemPropertiesModule),
  },
  {
    path:"warehouse-positioning",
    loadChildren:()=>
      import("./warehouse-positioning/warehouse-positioning.module").then((m) =>m.WarehousePositioningModule),
  },
  {
    path: "deliveryNote",
    loadChildren: () =>
    import("./delivery-note/delivery-note.module").then((m) => m.DeliveryNoteModule),
  },
  {
    path: "gatePass",
    loadChildren: () =>
    import("./gate-pass/gate-pass.module").then((m) => m.GatePassModule),
  },
  {
    path: "stockVerification",
    loadChildren: () =>
    import("./stock-verification/stock-verification.module").then((m) => m.StockVerificationModule),
  },
  {
    path: "item-category",
    loadChildren: () =>
    import("./item-category/item-category.module").then((m) => m.ItemCategoryModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
