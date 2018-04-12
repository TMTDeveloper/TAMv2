import { NgModule } from "@angular/core";

import { Ng2SmartTableModule } from "ng2-smart-table";
import {
  TransactionRouterModule,
  routedComponents
} from "./transaction.router.module";
import { ThemeModule } from "../../@theme/theme.module";
import { RiskRegisterModalComponent } from "./risk-register/modal/risk.register.modal.component";

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
  entryComponents: [RiskRegisterModalComponent],
  providers: [BackendService]
})
export class TransactionModule {}
