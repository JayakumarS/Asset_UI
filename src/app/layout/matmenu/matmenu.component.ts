// src/app/menu/menu.component.ts

import { Component, Input, ViewChild } from "@angular/core";
import { MatMenu } from "@angular/material/menu";
import { DynamicDatabase } from "../topbar/dynamic-database.service";

@Component({
  selector: "app-matmenu",
  templateUrl: "./matmenu.component.html",
})
export class MatmenuComponent {
  @Input() data: string[] = [];
  @Input() trigger = "test";
  @Input() isRootNode = false;

  isLoading = false;
  dataLoaded = false;

  constructor(private database: DynamicDatabase) {
    console.log(1)
  }

  getData(node: string) {
    if (!this.dataLoaded) {
      this.isLoading = true;
      this.database.getChildren(node).subscribe((d) => {
        this.data = d?.slice() || [];
        console.log(this.data)
        this.isLoading = false;
        this.dataLoaded = true;
      });
    }
  }

  isExpandable(node: string) {
    return this.database.isExpandable(node);
  }
}
