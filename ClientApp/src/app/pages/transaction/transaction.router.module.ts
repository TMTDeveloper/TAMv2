import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RiskRegisterComponent } from "./risk-register/risk.register.component";
import { RiskOverviewComponent } from "./risk-overview/risk.overview.component";
import { TransactionComponent } from "./transaction.component";
import { RiskRegisterModalComponent } from "./risk-register/modal/risk.register.modal.component";
import { RiskOverviewModalComponent } from "./risk-overview/modal/risk.overview.modal.component";
import { RiskRegisterDeptComponent } from "./risk-register/modal/risk.register.dept.component";
import { RiskRegisterAcdComponent } from "./risk-register/modal/risk.register.acd.component";
import { RiskRegisterQlComponent } from "./risk-register/modal/risk.register.ql.component";
import { RiskRegisterCtrComponent } from "./risk-register/modal/risk.register.ctr.component";
const routes: Routes = [
  {
    path: "",
    component: TransactionComponent,
    children: [
      {
        path: "risk-register",
        component: RiskRegisterComponent
      },
      {
        path: "risk-overview",
        component: RiskOverviewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRouterModule {}

export const routedComponents = [
  RiskRegisterComponent,
  RiskOverviewComponent,
  RiskRegisterModalComponent,
  RiskOverviewModalComponent,
  RiskRegisterDeptComponent,
  RiskRegisterAcdComponent,
  RiskRegisterQlComponent,
  RiskRegisterCtrComponent,
  TransactionComponent
];
