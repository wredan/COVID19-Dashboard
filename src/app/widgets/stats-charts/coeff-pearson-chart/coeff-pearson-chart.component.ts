import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { StatsService } from '../../../services/stats.service';

@Component({
  selector: 'app-coeff-pearson-chart',
  templateUrl: './coeff-pearson-chart.component.html',
  styleUrls: ['./coeff-pearson-chart.component.scss']
})
export class CoeffPearsonChartComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() type;
  @Input() heigth;
  @Input() title;

  public dataset = [];
  public pearsonChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'month'
        }
      }]
    }
  };

  public pearsonChartLabels = [];
  public pearsonChartType = 'bar';
  public pearsonChartLegend = true;
  public pearsonChartData = [];

  constructor(private statsManager: StatsService) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    this.data.data.forEach(el => {
      this.pearsonChartLabels.push(el.date);
    });    
    if(this.type == "pearson_cases_tests"){
      this.setPearsonCasesTests(this.data.data);
    } else if(this.type == "pearson_cases_deaths") {
      this.setPearsonCasesDeaths(this.data.data);
    }
  }

  setPearsonCasesTests(data) {
    let dailyCases = [];
    let dailyTests = [];
    let pearson = [];
    data.forEach(el => {
      dailyCases.push(el.new_cases);
      dailyTests.push(el.new_tests ? el.new_tests : 0);
      pearson.push(this.statsManager.coeffPearson(dailyCases, dailyTests));
    });

    this.pearsonChartType = 'bar';

    this.pearsonChartData.push({
      data: pearson,
      label: "Coefficiente di Pearson (casi-test)",
      fill: false,
      showLine: true,
      borderDash: [10, 10],
      backgroundColor: "#303F9F",

      pointRadius: 0,
      order: 1
    });
  }

  setPearsonCasesDeaths(data) {
    let dailyCases = [];
    let dailyDeaths = [];
    let pearson = [];
    data.forEach(el => {
      dailyCases.push(el.new_cases);
      dailyDeaths.push(el.new_deaths ? el.new_deaths : 0);
      pearson.push(this.statsManager.coeffPearson(dailyCases, dailyDeaths));
    });

    this.pearsonChartType = 'bar';

    this.pearsonChartData.push({
      data: pearson,
      label: "Coefficiente di Pearson (casi-morti)",
      fill: false,
      showLine: true,
      borderDash: [10, 10],
      backgroundColor: "#303F9F",

      pointRadius: 0,
      order: 1
    });
  }

}
