import { NgModule } from "@angular/core";

import { Ng2SmartTableModule } from "ng2-smart-table";
import { MasterRouterModule, routedComponents } from "./master.router.module";
import { ThemeModule } from "../../@theme/theme.module";
import { RiskIndicatorModalComponent } from "./risk-indicator/modal/risk.indicator.modal.component";
import { ToastrModule } from "ngx-toastr";
import { RiskMatriksIndicatorModalComponent } from "./risk-matriks-indicator/modal/risk.matriks.indicator.modal.component";
import { RiskRegisterModalComponent } from "./risk-register/modal/risk.register.modal.component";
@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    MasterRouterModule,
    ToastrModule.forRoot()
  ],
  declarations: [...routedComponents],
  entryComponents: [
    RiskIndicatorModalComponent,
    RiskMatriksIndicatorModalComponent,
    RiskRegisterModalComponent
  ],
  providers: []
})
export class MasterModule {}
