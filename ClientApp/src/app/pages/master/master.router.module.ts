import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MasterComponent } from "./master.component";
import { CompanyInputComponent } from "./company-input/company.input.component";
import { CompanyInputModalComponent } from "./company-input/modal/company.input.modal.component";
import { RiskIndicatorComponent } from "./risk-indicator/risk.indicator.component";
import { RiskIndicatorModalComponent } from "./risk-indicator/modal/risk.indicator.modal.component";
import { RiskMatriksIndicatorComponent } from "./risk-matriks-indicator/risk.matriks.indicator.component";
import { RiskMatriksIndicatorModalComponent } from "./risk-matriks-indicator/modal/risk.matriks.indicator.modal.component";
import { FinancialIndicatorRiskComponent } from "./financial-indicator-risk/financial.indicator.risk.component";
import { FinancialIndicatorRiskModalComponent } from "./financial-indicator-risk/modal/financial.indicator.risk.modal.component";
import { OperationalIndicatorRiskComponent } from "./operational-indicator-risk/Operational.indicator.risk.component";
import { OperationalIndicatorRiskModalComponent } from "./operational-indicator-risk/modal/operational.indicator.risk.modal.component";
import { QualitativeIndicatorComponent } from "./qualitative-indicator/qualitative.indicator.component";
import { QualitativeIndicatorModalComponent } from "./qualitative-indicator/modal/qualitative.indicator.modal.component";
import { DeptInputComponent } from "./dept-input/dept.input.component";
import { RiskRegisterComponent } from "./risk-register/risk.register.component";
import { RiskRegisterModalComponent } from "./risk-register/modal/risk.register.modal.component";

const routes: Routes = [
  {
    path: "",
    component: MasterComponent,
    children: [
      {
        path: "company-input",
        component: CompanyInputComponent
      },
      {
        path: "risk-indicator",
        component: RiskIndicatorComponent
      },
      {
        path: "risk-matriks-indicator",
        component: RiskMatriksIndicatorComponent
      },
      {
        path: "financial-indicator-risk",
        component: FinancialIndicatorRiskComponent
      },
      {
        path: "operational-indicator-risk",
        component: OperationalIndicatorRiskComponent
      },
      {
        path: "qualitative-indicator",
        component: QualitativeIndicatorComponent
      },
      {
        path: "dept-input",
        component: DeptInputComponent
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
export class MasterRouterModule { }

export const routedComponents = [
  MasterComponent,
  CompanyInputComponent,
  CompanyInputModalComponent,
  RiskIndicatorComponent,
  RiskIndicatorModalComponent,
  RiskMatriksIndicatorComponent,
  RiskMatriksIndicatorModalComponent,
  FinancialIndicatorRiskComponent,
  FinancialIndicatorRiskModalComponent,
  OperationalIndicatorRiskComponent,
  OperationalIndicatorRiskModalComponent,
  QualitativeIndicatorComponent,
  QualitativeIndicatorModalComponent,
  DeptInputComponent,
  RiskRegisterComponent,
  RiskRegisterModalComponent
];
