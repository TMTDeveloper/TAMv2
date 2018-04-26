import { NgModule } from "@angular/core";
import { BackendService } from "../../@core/data/backend.service";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "../../@theme/theme.module";
import { DashboardComponent } from "./dashboard.component";
import { ToastrModule } from "ngx-toastr";
import { ChartComponent } from './chart/chart.component';
@NgModule({
  imports: [ThemeModule, Ng2SmartTableModule,ToastrModule.forRoot()],
  declarations: [DashboardComponent,ChartComponent],
  providers: [BackendService]
})
export class DashboardModule {}
