import { Component, OnInit, Input, OnChanges } from '@angular/core';

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
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day'
        },
        ticks: {
          min: new Date().setMonth(new Date().getMonth() - 2),
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          return Number(tooltipItem.value).toLocaleString('en-US');
        },
      }
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy'
        },
        zoom: {
          enabled: true,
          mode: 'xy'
        }
      }
    }
  };

  public timelineChartLabels = [];
  public timelineChartType = 'line';
  public timelineChartLegend = true;
  public timelineChartData = [];

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(): void {
    this.data.data.forEach(el => {
      this.timelineChartLabels.push(new Date(el.date));
    });
    switch (this.type) {
      case "cases":
        this.setCases(this.data.data);
        break;
      case "tests":
        this.setTests(this.data.data);
        break;     
      case "death":
        this.setDeath(this.data.data);
        break;    
      default:
        break;
    }
  }

  setDeath(data) {
    let dataset = [];
    data.forEach(el => {
      dataset.push(el.new_deaths);
    });

    this.timelineChartData.push({
      data: dataset,
      label: 'Daily Death Distribution',
      fill: false,
      borderColor: "#D32F2F",
      pointBackgroundColor: '#D32F2F',
      pointBorderColor: '#D32F2F',
      pointRadius: 5,
      order: 5
    })
  }

  setCases(data) {
    let dataset = [];
    data.forEach(el => {
      dataset.push(el.new_cases);
    });

    this.timelineChartData.push({
      data: dataset,
      label: 'Daily Cases Distribution',
      fill: false,
      borderColor: "#1976D2",
      pointBackgroundColor: '#1976D2',
      pointBorderColor: '#1976D2',
      pointRadius: 4,
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
      label: "Daily Tests Distribution",
      fill: false,
      borderColor: "#388E3C",
      pointBackgroundColor: '#388E3C',
      pointBorderColor: '#388E3C',
      pointRadius: 4,
      order: 1
    });
  }
}
