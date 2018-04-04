import { NgModule } from "@angular/core";

import { Ng2SmartTableModule } from "ng2-smart-table";
import { MasterRouterModule, routedComponents } from "./master.router.module";
import { ThemeModule } from "../../@theme/theme.module";
import { CompanyInputModalComponent } from "./company-input/modal/company.input.modal.component";
import { RiskIndicatorModalComponent } from "./risk-indicator/modal/risk.indicator.modal.component";
import { ToastrModule } from "ngx-toastr";
import { RiskMatriksIndicatorModalComponent } from "./risk-matriks-indicator/modal/risk.matriks.indicator.modal.component";
import { FinancialIndicatorRiskModalComponent } from "./financial-indicator-risk/modal/financial.indicator.risk.modal.component";
import { OperationalIndicatorRiskModalComponent } from "./operational-indicator-risk/modal/operational.indicator.risk.modal.component";
import { QualitativeIndicatorModalComponent } from "./qualitative-indicator/modal/qualitative.indicator.modal.component";
import { RiskRegisterModalComponent } from "./risk-register/modal/risk.register.modal.component";
import { BackendService } from "../../@core/data/backend.service";
@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    MasterRouterModule,
    ToastrModule.forRoot()
  ],
  declarations: [...routedComponents],
  entryComponents: [
    CompanyInputModalComponent,
    RiskIndicatorModalComponent,
    RiskMatriksIndicatorModalComponent,
    FinancialIndicatorRiskModalComponent,
    OperationalIndicatorRiskModalComponent,
    QualitativeIndicatorModalComponent,
    RiskRegisterModalComponent
  ],
  providers: [BackendService]
})
export class MasterModule {}
