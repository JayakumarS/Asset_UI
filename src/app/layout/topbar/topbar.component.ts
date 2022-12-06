import { Component } from "@angular/core";
import { DynamicDatabase } from "./dynamic-database.service";

@Component({
  selector: "app-topbar",
  templateUrl: "topbar.component.html",
  styleUrls: ["./topbar.component.scss"]
})
export class TopbarComponent {
  title = "mat-menu-dynamic-data";
  initialData: string[] = [];
  constructor(private database: DynamicDatabase) {
    this.initialData = this.database.rootLevelNodes.slice();
    console.log(this.initialData)
  }
}