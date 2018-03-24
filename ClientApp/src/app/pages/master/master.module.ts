import { NgModule } from "@angular/core";

import { Ng2SmartTableModule } from "ng2-smart-table";
import { MasterRouterModule, routedComponents } from "./master.router.module";
import { ThemeModule } from "../../@theme/theme.module";
import { RiskIndicatorModalComponent } from "./risk-indicator/modal/risk.indicator.modal.component";

@NgModule({
  imports: [ThemeModule, Ng2SmartTableModule, MasterRouterModule],
  declarations: [...routedComponents],
  entryComponents: [RiskIndicatorModalComponent],
  providers: []
})
export class MasterModule {}
