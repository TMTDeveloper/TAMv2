import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MasterComponent } from "./master.component";
import {RiskIndicatorComponent} from "./risk-indicator/risk.indicator.component"
import {RiskIndicatorModalComponent} from "./risk-indicator/modal/risk.indicator.modal.component"
const routes: Routes = [
  {
    path: "",
    component: MasterComponent,
    children: [
      {
        path: "risk-indicator",
        component: RiskIndicatorComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRouterModule {}

export const routedComponents = [MasterComponent,RiskIndicatorComponent,RiskIndicatorModalComponent];
