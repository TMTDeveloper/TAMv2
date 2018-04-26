
import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import "anychart";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"]
})
export class ChartComponent implements OnInit {
  subscription: Subscription;

  constructor() {}

  @ViewChild("chartContainer") container;

  chart: anychart.charts.HeatMap = null;
  data: any = [
    { x: "Rare", y: "Insignificant", heat: 0, fill: "#4bf442" },
    { x: "Rare", y: "Minor", heat: 0, fill: "#4bf442" },
    { x: "Rare", y: "Moderate", heat: 1, fill: "#90caf9" },
    { x: "Rare", y: "Major", heat: 1, fill: "#90caf9" },
    { x: "Rare", y: "Catasthropic", heat: 2, fill: "#ffb74d" },
    { x: "Unlikely", y: "Insignificant", heat: 0, fill: "#4bf442" },
    { x: "Unlikely", y: "Minor", heat: 0, fill: "#4bf442" },
    { x: "Unlikely", y: "Moderate", heat: 1, fill: "#90caf9" },
    { x: "Unlikely", y: "Major", heat: 2, fill: "#ffb74d" },
    { x: "Unlikely", y: "Catasthropic", heat: 2, fill: "#ffb74d" },
    { x: "Possible", y: "Insignificant", heat: 0, fill: "#4bf442" },
    { x: "Possible", y: "Minor", heat: 1, fill: "#90caf9" },
    { x: "Possible", y: "Moderate", heat: 2, fill: "#ffb74d" },
    { x: "Possible", y: "Major", heat: 2, fill: "#ffb74d" },
    { x: "Possible", y: "Catasthropic", heat: 2, fill: "#ffb74d" },
    { x: "Likely", y: "Insignificant", heat: 1, fill: "#90caf9" },
    { x: "Likely", y: "Minor", heat: 1, fill: "#90caf9" },
    { x: "Likely", y: "Moderate", heat: 2, fill: "#ffb74d" },
    { x: "Likely", y: "Major", heat: 3, fill: "#d84315" },
    { x: "Likely", y: "Catasthropic", heat: 3, fill: "#d84315" },
    { x: "Almost\nCertain", y: "Insignificant", heat: 1, fill: "#90caf9" },
    { x: "Almost\nCertain", y: "Minor", heat: 2, fill: "#ffb74d" },
    { x: "Almost\nCertain", y: "Moderate", heat: 2, fill: "#ffb74d" },
    { x: "Almost\nCertain", y: "Major", heat: 3, fill: "#d84315" },
    { x: "Almost\nCertain", y: "Catasthropic", heat: 3, fill: "#d84315" }
  ];
  ngOnInit() {
    // Default data set mapping, hardcoded here.
    this.chart = anychart.heatMap(this.data);
    this.chart.xAxis().orientation("bottom");
    this.chart.yAxis().orientation("left");
    this.chart.xScale().inverted(false);
    this.chart.yScale().inverted(false);
  }

  ngAfterViewInit() {
    let legend = this.chart.legend();
    legend.enabled(true);
    legend.itemsFormatter(function() {
      return [
        { text: "Low", iconFill: "#4bf442" },
        { text: "Medium", iconFill: "#90caf9" },
        { text: "High", iconFill: "#ffb74d" },
        { text: "Extreme", iconFill: "#d84315" }
      ];
    });
    legend.position("bottom");
    console.log();
    let namesList = ["Low", "Medium", "High", "Extreme"];
    this.chart
      .labels()
      .enabled(true)
      .minFontSize(14)
      .format(function() {
        return namesList[this.heat];
      });
    this.chart.legend(true);
    this.chart.container(this.container.nativeElement);
    this.chart.draw();
  }
}
