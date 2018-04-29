import { NgModule } from "@angular/core";

import { Ng2SmartTableModule } from "ng2-smart-table";
import {
  TransactionRouterModule,
  routedComponents
} from "./transaction.router.module";
import { ThemeModule } from "../../@theme/theme.module";
import { RiskRegisterModalComponent } from "./risk-register/modal/risk.register.modal.component";
import { RiskRegisterDeptComponent } from "./risk-register/modal/risk.register.dept.component";
import { RiskRegisterAcdComponent } from "./risk-register/modal/risk.register.acd.component";
import { RiskRegisterQlComponent } from "./risk-register/modal/risk.register.ql.component";
import { RiskRegisterCtrComponent } from "./risk-register/modal/risk.register.ctr.component";
import { AccidentInputModalComponent } from "./accident-input/modal/accident.input.modal.component";
import { DeptInputModalComponent } from "./dept-input/modal/dept.input.modal.component";
import { ToastrModule } from "ngx-toastr";
import { BackendService } from "../../@core/data/backend.service";
import { CurrencyMaskModule } from "ng2-currency-mask";
@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    TransactionRouterModule,
    CurrencyMaskModule,
    ToastrModule.forRoot()
  ],
  declarations: [...routedComponents],
  entryComponents: [
    RiskRegisterModalComponent,
    AccidentInputModalComponent,
    DeptInputModalComponent,
    RiskRegisterDeptComponent,
    RiskRegisterAcdComponent,
    RiskRegisterQlComponent,
    RiskRegisterCtrComponent
  ],
  providers: [BackendService]
})
export class TransactionModule {}
