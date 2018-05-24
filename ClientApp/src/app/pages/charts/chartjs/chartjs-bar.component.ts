import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { BackendService } from "../../../@core/data/backend.service";
import 'chartjs-plugin-datalabels';
@Component({
  selector: 'ngx-chartjs-bar',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsBarComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  tabledata: any[] = [
    {
      irRiskExtreme:0,
      irRiskHigh:0,
      irRiskMedium:0,
      irRiskLow:0,
      rdRiskExtreme:0,
      rdRiskHigh:0,
      rdRiskMedium:0,
      rdRiskLow:0,
      exRiskExtreme:0,
      exRiskHigh:0,
      exRiskMedium:0,
      exRiskLow:0
    }
  ];

  chartdata: any=[
    {
      irRiskExtreme:0,
      irRiskHigh:0,
      irRiskMedium:0,
      irRiskLow:0,
      rdRiskExtreme:0,
      rdRiskHigh:0,
      rdRiskMedium:0,
      rdRiskLow:0,
      exRiskExtreme:0,
      exRiskHigh:0,
      exRiskMedium:0,
      exRiskLow:0
    }
  ]

  constructor(private theme: NbThemeService,
    public service: BackendService) {
      this.loadData();

    /*this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: ['Inherent', 'Residual', 'Expected'],
        datasets: [{
          data: [this.chartdata.irRiskExtreme,this.chartdata.rdRiskExtreme,this.chartdata.exRiskExtreme],
          label: 'Extreme',
          backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
        }, {
          data: [this.chartdata.irRiskHigh,this.chartdata.rdRiskHigh,this.chartdata.exRiskHigh],
          label: 'High',
          backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
        },
        {
          data: [this.chartdata.irRiskMedium,this.chartdata.rdRiskMedium,this.chartdata.exRiskMedium],
          label: 'Medium',
          backgroundColor: NbColorHelper.hexToRgbA(colors.warningLight, 0.8),
        },
        {
          data: [this.chartdata.irRiskLow,this.chartdata.rdRiskLow,this.chartdata.exRiskLow],
          label: 'Low',
          backgroundColor: NbColorHelper.hexToRgbA(colors.dangerLight, 0.8),
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });*/
  }

  loadData() {
    this.service.getreq("RiskMovements").subscribe(response => {
      if (response != null) {
        const data = response;
        //console.log(JSON.stringify(response));
        data.forEach((element, ind) => {
          data[ind].status = "0";
          this.tabledata = data;
        });
        this.reload();
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;
    
          console.log(this.chartdata);
    
          this.data = {
            labels: ['Inherent', 'Residual', 'Expected'],
            datasets: [{
              data: [this.chartdata.irRiskExtreme,this.chartdata.rdRiskExtreme,this.chartdata.exRiskExtreme],
              label: 'Extreme',
              backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
            }, {
              data: [this.chartdata.irRiskHigh,this.chartdata.rdRiskHigh,this.chartdata.exRiskHigh],
              label: 'High',
              backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
            },
            {
              data: [this.chartdata.irRiskMedium,this.chartdata.rdRiskMedium,this.chartdata.exRiskMedium],
              label: 'Medium',
              backgroundColor: NbColorHelper.hexToRgbA(colors.warningLight, 0.8),
            },
            {
              data: [this.chartdata.irRiskLow,this.chartdata.rdRiskLow,this.chartdata.exRiskLow],
              label: 'Low',
              backgroundColor: NbColorHelper.hexToRgbA(colors.dangerLight, 0.8),
            }],
          };
    
          this.options = {
            plugins: {
              datalabels: {
                anchor: 'end',
                align: 'top',
                formatter: Math.round,
                font: {
                  weight: 'bold'
                },
                color: function(context) {
                  var index = context.dataIndex;
                  var value = context.dataset.data[index];
                  return value < 1 ? 'transparent' : chartjs.textColor
              }
              }
            },
            tooltips:{
              enabled:true
            },
            title: {
              display: true,
              text: 'Risk Movement'
          },
            maintainAspectRatio: false,
            responsive: true,
            legend: {
              labels: {
                fontColor: chartjs.textColor,
              },
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false,
                    color: chartjs.axisLineColor,
                  },
                  ticks: {
                    fontColor: chartjs.textColor,
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    display: true,
                    color: chartjs.axisLineColor,
                  },
                  ticks: {
                    fontColor: chartjs.textColor,
                  },
                },
              ],
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
    //console.log(arr[0] != null);
    if (arr[0] != null) {
      //console.log("masuksini");
      this.chartdata = arr[0];
     // console.log(this.chartdata);
    } else {
      this.chartdata = {
        irRiskExtreme:0,
        irRiskHigh:0,
        irRiskMedium:0,
        irRiskLow:0,
        rdRiskExtreme:0,
        rdRiskHigh:0,
        rdRiskMedium:0,
        rdRiskLow:0,
        exRiskExtreme:0,
        exRiskHigh:0,
        exRiskMedium:0,
        exRiskLow:0
      };
    }
    
  }

  

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
