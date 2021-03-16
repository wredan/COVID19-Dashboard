import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-positive-test-chart',
  templateUrl: './positive-test-chart.component.html',
  styleUrls: ['./positive-test-chart.component.scss']
})
export class PositiveTestChartComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() heigth;

  public dataset = [];
  public testChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day'
        },
        dysplay: true,
        ticks: {
          min: new Date().setMonth(new Date().getMonth() - 2),
        }
      }],
      yAxes: [{
        ticks: {
            callback: function(value, index, values) {
                return value + "%";
            }
        }
    }]
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

  public testChartLabels = [];
  public testChartType = 'line';
  public testChartLegend = true;
  public testChartData = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {   
    this.setPositiveTests();
  }

  setPositiveTests() {
    let data = this.data.data;
    let dataset = [];
    data.forEach(el => {
      this.testChartLabels.push(new Date(el.date));
      dataset.push(el.positive_rate*100);
    });

    this.testChartData.push({
      data: dataset ? dataset : [],
      label: "Positive Rate",
      fill: false,
      borderColor: "#388E3C",
      pointBackgroundColor: '#388E3C',
      pointBorderColor: '#388E3C',
      pointRadius: 4,
      order: 1
    });
  }
}