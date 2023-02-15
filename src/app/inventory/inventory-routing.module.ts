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
  },
  {
    path: "in-stock",
    loadChildren: () =>
    import("./in-stock/in-stock.module").then((i) => i.InStockModule),
  },
  {
    path: "purchaseOrder",
    loadChildren: () =>
    import("./purchase-order/purchase-order.module").then((p) => p.PurchaseOrderModule),
  },
  {
    path: "purchaseInvoice",
    loadChildren: () =>
    import("./purchase-invoice/purchase-invoice.module").then((p) => p.PurchaseInvoiceModule),
  },
  {
    path: "grn",
    loadChildren: () =>
    import("./grn/grn.module").then((g) => g.GrnModule),
  },
  {
    path: "inventory-reports",
    loadChildren: () =>
    import("./inventory-reports/inventory-reports.module").then((p) => p.InventoryReportsModule),
  },
  {
    path: "UOM-catagory",
    loadChildren: () =>
    import("./u-category/u-category.module").then((p) => p.UCategoryModule),
  },
  {
    path: "sales-order",
    loadChildren: () =>
    import("./sales-order/sales-order.module").then((p) => p.SalesOrderModule),
  },
  {
    path: "Bank-Reciepts",
    loadChildren: () =>
    import("./bank-reciepts/bank-reciepts.module").then((p) => p.BankRecieptsModule)
  },
  {
    path: "salesInvoice",
    loadChildren: () =>
    import("./sales-invoice/sales-invoice.module").then((p) => p.SalesInvoiceModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
