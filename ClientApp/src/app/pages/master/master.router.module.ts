import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MasterComponent } from "./master.component";
import { RiskIndicatorComponent } from "./risk-indicator/risk.indicator.component";
import { RiskIndicatorModalComponent } from "./risk-indicator/modal/risk.indicator.modal.component";
import { RiskMatriksIndicatorComponent } from "./risk-matriks-indicator/risk.matriks.indicator.component";
import { RiskMatriksIndicatorModalComponent } from "./risk-matriks-indicator/modal/risk.matriks.indicator.modal.component";
import { RiskRegisterComponent } from "./risk-register/risk.register.component";
import { RiskRegisterModalComponent } from "./risk-register/modal/risk.register.modal.component";
const routes: Routes = [
  {
    path: "",
    component: MasterComponent,
    children: [
      {
        path: "risk-indicator",
        component: RiskIndicatorComponent
      },
      {
        path: "risk-matriks-indicator",
        component: RiskMatriksIndicatorComponent
      },
      {
        path: "risk-register",
        component: RiskRegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRouterModule {}

export const routedComponents = [
  MasterComponent,
  RiskIndicatorComponent,
  RiskIndicatorModalComponent,
  RiskMatriksIndicatorComponent,
  RiskMatriksIndicatorModalComponent,
  RiskRegisterComponent,
  RiskRegisterModalComponent
];
