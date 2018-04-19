import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ToastrService } from "ngx-toastr";
import { BackendService } from "../../../@core/data/backend.service";
@Component({
  selector: 'ngx-chartjs-pie',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsPieComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  tabledata: any[] = [
    {
      ctrEff:0,
      ctrMod:0,
      ctrIff:0,
      ctrWeak:0
    }
  ];

  chartdata: any=[
    {
      ctrEff:5,
      ctrMod:2,
      ctrIff:1,
      ctrWeak:0
    }
  ]

  constructor(private theme: NbThemeService,
    public service: BackendService) {
      this.loadData();
    /* this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      console.log("tes");


      this.data = {
        labels: ['Effective', 'Moderate', 'Ineffective','Weak'],
        datasets: [{
          data: [this.chartdata[0].ctrEff, this.chartdata.ctrMod, this.chartdata.ctrIff,this.chartdata.ctrWeak],
          backgroundColor: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight],
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });*/
  }

  loadData() {
    this.service.getreq("ControlEffectivenesses").subscribe(response => {
      if (response != null) {
        const data = response;
        //console.log(JSON.stringify(response));
        data.forEach((element, ind) => {
          data[ind].status = "0";
          this.tabledata = data;
        });
        this.reload();
       // console.log(this.chartdata[0]);

        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;
    
          //console.log("tes");
    
    
          this.data = {
            labels: ['Effective', 'Moderate', 'Ineffective','Weak'],
            datasets: [{
              data: [this.chartdata.ctrEff, this.chartdata.ctrMod, this.chartdata.ctrIff,this.chartdata.ctrWeak],
              backgroundColor: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight],
            }],
          };
    
          this.options = {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
              xAxes: [
                {
                  display: false,
                },
              ],
              yAxes: [
                {
                  display: false,
                },
              ],
            },
            legend: {
              labels: {
                fontColor: chartjs.textColor,
              },
            },
          };
        });
      }
    });
  }

  reload() {
    let arr = this.tabledata.filter(item => {
      return item.division == "ISTD";
    });
    console.log(arr[0] != null);
    if (arr[0] != null) {
      console.log("masuksini");
      this.chartdata = arr[0];
      //console.log(this.chartdata);
    } else {
      this.chartdata = {
      ctrEff:0,
      ctrMod:0,
      ctrIff:0,
      ctrWeak:0
      };
    }
    
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
