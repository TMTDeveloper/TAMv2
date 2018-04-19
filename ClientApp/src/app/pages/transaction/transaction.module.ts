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

import { ToastrModule } from "ngx-toastr";
import { BackendService } from "../../@core/data/backend.service";
@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    TransactionRouterModule,
    ToastrModule.forRoot()
  ],
  declarations: [...routedComponents],
  entryComponents: [
    RiskRegisterModalComponent,
    RiskRegisterDeptComponent,
    RiskRegisterAcdComponent,
    RiskRegisterQlComponent,
    RiskRegisterCtrComponent],
  providers: [BackendService]
})
export class TransactionModule {}
