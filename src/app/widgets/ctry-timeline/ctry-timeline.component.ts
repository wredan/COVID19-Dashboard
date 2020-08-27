import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-ctry-timeline',
  templateUrl: './ctry-timeline.component.html',
  styleUrls: ['./ctry-timeline.component.scss']
})
export class CtryTimelineComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() type;
  @Input() color;
  @Input() heigth;

  public dataset = [];
  public timelineChartColors = [];
  public timelineChartOptions = {
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

  public timelineChartLabels = [];
  public timelineChartType = 'line';
  public timelineChartLegend = true;
  public timelineChartData = [];

  constructor(private statsManager: StatsService) { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    this.data.data.forEach(el => {
      this.timelineChartLabels.push(el.date);
    });
    switch (this.type) {
      case "cases":
        this.setCases(this.data.data);
        break;
      case "tests":
        this.setTests(this.data.data);
        break;
      case "casesAndTests":
        this.setCasesAndTests(this.data.data);
        break;
      case "death":
        this.setDeath(this.data.data);
        break;
      case "regressione_lineare_cases":
        this.setLinearRegressionData(this.data.data);
        this.setCases(this.data.data);
        break;
      case "pearson_cases":
        this.setPearsonCases(this.data.data);
        break;
      case "pearson_cases_tests":
        this.setPearsonTestsAndCases(this.data.data);
        break;

      default:
        break;
    }
  }

  setCasesAndTests(data) {
    let tests = [];
    let dataset = [];
    data.forEach(el => {
      dataset.push(el.new_cases);
      tests.push(el.new_tests);
    });

    this.timelineChartData.push({
      data: dataset,
      label: 'Distribuzione Giornaliera Casi',
      fill: false,
      pointRadius: 1
    });

    this.timelineChartData.push({
      data: tests,
      label: "Distribuzione giornaliera tamponi",
      fill: false,
      pointRadius: 1
    });
  }

  setDeath(data) {
    let dataset = [];
    data.forEach(el => {
      dataset.push(el.new_deaths);
    });

    this.timelineChartData.push({
      data: dataset,
      label: 'Distribuzione Giornaliera Morti',
      fill: false,
      borderColor: "#D32F2F",
      pointBackgroundColor: '#D32F2F',
      pointBorderColor: '#D32F2F',
      pointRadius: 1,
      order: 1
    })
  }

  setCases(data) {
    let dataset = [];
    data.forEach(el => {
      dataset.push(el.new_cases);
    });

    this.timelineChartData.push({
      data: dataset,
      label: 'Distribuzione Giornaliera Casi',
      fill: false,
      borderColor: "#1976D2",
      pointBackgroundColor: '#1976D2',
      pointBorderColor: '#1976D2',
      pointRadius: 1,
      order: 1
    });
  }

  setTests(data) {
    let dataset = [];
    data.forEach(el => {
      dataset.push(el.new_tests);
    });

    this.timelineChartData.push({
      data: dataset ? dataset : [],
      label: "Distribuzione giornaliera tamponi",
      fill: false,
      borderColor: "#388E3C",
      pointBackgroundColor: '#388E3C',
      pointBorderColor: '#388E3C',
      pointRadius: 1,
      order: 1
    });
  }


  setLinearRegressionData(data) {
    let dataTimestamp = [];
    let dataset = [];
    data.forEach(el => {
      dataTimestamp.push(el.timestamp);
      dataset.push(el.new_cases);
    });

    let drawPoints = this.statsManager.getRegrLinDrawPoints(
      dataTimestamp,
      this.statsManager.coeffM(dataTimestamp, dataset),
      this.statsManager.coeffQ(dataTimestamp, dataset),
    );

    this.timelineChartData.push({
      data: [
        { x: new Date(drawPoints[0].x * 1000), y: drawPoints[0].y },
        { x: new Date(drawPoints[1].x * 1000), y: drawPoints[1].y },
      ],
      label: "Retta di Regressione y=mx+q",
      fill: false,
      showLine: true,
      borderDash: [10, 10],
      borderColor: "#FFC107",
      pointRadius: 0,
      order: 1
    });

  }

  setPearsonCases(data) {
    let dataTimestamp = [];
    let dailyCases = [];
    let pearson = [];
    data.forEach(el => {
      dataTimestamp.push(el.timestamp);
      dailyCases.push(el.new_cases);
      pearson.push(this.statsManager.coeffPearson(dailyCases, dataTimestamp));
    });

    this.timelineChartType = 'bar';

    this.timelineChartData.push({
      data: pearson,
      label: "Coefficiente di Pearson",
      fill: false,
      showLine: true,
      borderDash: [10, 10],
      backgroundColor: "#303F9F",

      pointRadius: 0,
      order: 1
    });
  }

  setPearsonTestsAndCases(data) {
    let dailyCases = [];
    let dailyTests = [];
    let pearson = [];
    data.forEach(el => {
      dailyCases.push(el.new_cases);
      dailyTests.push(el.new_tests ? el.new_tests : 0);
      pearson.push(this.statsManager.coeffPearson(dailyCases, dailyTests));
    });

    this.timelineChartType = 'bar';

    this.timelineChartData.push({
      data: pearson,
      label: "Coefficiente di Pearson",
      fill: false,
      showLine: true,
      borderDash: [10, 10],
      backgroundColor: "#303F9F",

      pointRadius: 0,
      order: 1
    });
  }

}
